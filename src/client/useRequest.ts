import { useState, useCallback, useEffect } from "react";
import { EndpointType, ErrorResponse, OptionsType } from "./types";

type UseRequestReturnType<DataType> = {
  dispatch: () => Promise<void>;
  data: DataType | undefined;
  isFetching: boolean;
  error: ErrorResponse | undefined;
  clearErrors: () => void;
};

export const useRequest = <DataType = unknown>(
  { url, method, body }: EndpointType,
  { onReceive, onFailure }: OptionsType = {}
): UseRequestReturnType<DataType> => {
  const [data, setData] = useState<DataType | undefined>(undefined);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | undefined>(undefined);

  const dispatch = useCallback(async () => {
    setIsFetching(true);
    try {
      const headers = { "Content-Type": "application/json" };
      const config = { method, headers, body };

      const response = await fetch(`${process.env.API_HOST}/${url}`, config);
      const data = await response.json();

      if (response.ok) {
        setData(data);
      } else {
        setError({ statusCode: response.status, originalError: data });
      }
      setIsFetching(false);
    } catch (err) {
      setIsFetching(false);
    }
  }, [body, method, url]);

  const clearErrors = useCallback(() => {
    if (!error) return;
    setError(undefined);
  }, [error]);

  useEffect(() => {
    if (!data) return;
    onReceive?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!error) return;
    onFailure?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return { dispatch, data, isFetching, error, clearErrors };
};
