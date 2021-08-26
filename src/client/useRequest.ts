import { useState, useCallback, useEffect } from "react";
import { EndpointType, ErrorResponse, OptionsType, StatusType } from "./types";

const LOCAL_STORAGE_KEY = "localStorageKey";

type UseRequestReturnType<ResponseType> = {
  dispatch: () => Promise<void>;
  data: ResponseType | undefined;
  isFetching: boolean;
  error: ErrorResponse | undefined;
  clearErrors: () => void;
};

export const useRequest = <ResponseType>(
  { url, method = "GET", body, baseUrl = process.env.API_HOST }: EndpointType,
  { onReceive, onFailure, intialFetch = false, refetchInterval }: OptionsType = {}
): UseRequestReturnType<ResponseType> => {
  const [state, setState] = useState<StatusType<ResponseType>>({
    data: undefined,
    isFetching: false,
    error: undefined,
  });

  const { data, isFetching, error } = state;

  const token = window.localStorage.getItem(LOCAL_STORAGE_KEY);

  const dispatch = useCallback(async () => {
    setState((state) => ({ ...state, isFetching: true }));
    try {
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const config = { method, headers, ...(body && { body: JSON.stringify(body) }) };

      const response = await fetch(`${baseUrl}/${url}`, config);
      const data = await response.json();

      if (response.ok) {
        setState((state) => ({ ...state, data, isFetching: false }));
      } else {
        setState((state) => ({
          ...state,
          error: { statusCode: response.status, originalError: data },
          isFetching: false,
        }));
      }
    } catch (err) {
      setState((state) => ({
        ...state,
        error: { statusCode: 0, originalError: err.message },
        isFetching: false,
      }));
    }
  }, [baseUrl, body, method, token, url]);

  useEffect(() => {
    if (!intialFetch) return;
    dispatch();
  }, [dispatch, intialFetch]);

  const clearErrors = useCallback(() => {
    if (!error) return;
    setState((state) => ({ ...state, error: undefined }));
  }, [error]);

  useEffect(() => {
    if (!intialFetch || !refetchInterval) return;
    const timeoutId = setInterval(() => {
      dispatch();
    }, refetchInterval);

    return () => clearInterval(timeoutId);
  }, [dispatch, intialFetch, refetchInterval]);

  useEffect(() => {
    if (!data) return;
    onReceive?.();
  }, [data]);

  useEffect(() => {
    if (!error) return;
    onFailure?.();
  }, [error]);

  return { dispatch, data, isFetching, error, clearErrors };
};
