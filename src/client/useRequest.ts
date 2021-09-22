import { camelizeKeys } from "humps";
import { useState, useCallback, useEffect } from "react";
import { useIntervalFetching, useMock } from "./hooks";
import { EndpointType, ErrorResponse, OptionsType, StatusType } from "./types";
import { stringifyUrl } from "./utils";

type UseRequestReturnType<ResponseType, ErrorType> = {
  dispatch: (() => Promise<void>) | (() => void);
  data: ResponseType | undefined;
  isFetching: boolean;
  error: ErrorResponse<ErrorType> | undefined;
  clearErrors: () => void;
  disableInterval: () => void;
  enableInterval: () => void;
};

export const useRequest = <ResponseType = any, ErrorType = unknown>(
  { url, method = "GET", body, baseUrl = process.env.API_HOST, query, mock }: EndpointType,
  { onReceive, onFailure, intialFetch = false, refetchInterval }: OptionsType = {}
): UseRequestReturnType<ResponseType, ErrorType> => {
  const [state, setState] = useState<StatusType<ResponseType, ErrorType>>({
    data: undefined,
    isFetching: false,
    error: undefined,
  });

  const { data, isFetching, error } = state;

  const token = window.localStorage.getItem(process.env.LOCAL_STORAGE_KEY || "");

  const dispatch = useCallback(async () => {
    setState((state) => ({ ...state, isFetching: true }));
    try {
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const config = { method, headers, ...(body && { body: JSON.stringify(body) }) };

      const parsedUrl = query ? stringifyUrl({ url, query }) : url;

      const response = await fetch(`${baseUrl}/${parsedUrl}`, config);
      const data = await response.json();

      if (response.ok) {
        setState((state) => ({
          ...state,
          data: camelizeKeys(data) as unknown as ResponseType,
          isFetching: false,
        }));
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
        error: { statusCode: 0 },
        isFetching: false,
      }));
    }
  }, [baseUrl, method, token, url, query]);

  useEffect(() => {
    if (!intialFetch) return;
    dispatch();
  }, [dispatch, intialFetch]);

  const clearErrors = useCallback(() => {
    if (!error) return;
    setState((state) => ({ ...state, error: undefined }));
  }, [error]);

  useEffect(() => {
    if (!data) return;
    onReceive?.();
  }, [data]);

  useEffect(() => {
    if (!error) return;
    onFailure?.();
  }, [error]);

  const { enableInterval, disableInterval } = useIntervalFetching(dispatch, intialFetch, refetchInterval);

  const { mockDispatch } = useMock<ResponseType, ErrorType>(mock, setState);

  return {
    dispatch: mock ? mockDispatch : dispatch,
    data,
    isFetching,
    error,
    clearErrors,
    disableInterval,
    enableInterval,
  };
};
