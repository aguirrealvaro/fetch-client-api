import { useState, useCallback, useEffect } from "react";
import { EndpointType, ErrorResponse, OptionsType } from "./types";

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
  const [data, setData] = useState<ResponseType | undefined>(undefined);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | undefined>(undefined);

  const token = window.localStorage.getItem(LOCAL_STORAGE_KEY);

  const dispatch = useCallback(async () => {
    setIsFetching(true);
    try {
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const config = { method, headers, ...(body && { body: JSON.stringify(body) }) };

      const response = await fetch(`${baseUrl}/${url}`, config);
      const data = await response.json();

      if (response.ok) {
        setData(data);
      } else {
        setError({ statusCode: response.status, originalError: data });
      }
      setIsFetching(false);
    } catch (err) {
      console.log(err);
      setError({ statusCode: 0, originalError: err.message });
      setIsFetching(false);
    }
  }, [baseUrl, body, method, token, url]);

  useEffect(() => {
    if (!intialFetch) return;
    dispatch();
  }, [dispatch, intialFetch]);

  const clearErrors = useCallback(() => {
    if (!error) return;
    setError(undefined);
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
