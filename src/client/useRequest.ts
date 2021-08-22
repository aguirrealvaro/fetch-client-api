import { useState, useCallback, useEffect } from "react";
import { ErrorResponse } from "./types";

type OptionsType = {
  onReceive?: () => void;
  onFailure?: () => void;
};

type UseRequestReturnType<DataType> = {
  dispatch: () => Promise<void>;
  data: DataType | undefined;
  isFetching: boolean;
  error: ErrorResponse | undefined;
  clearErrors: () => void;
};

export const useRequest = <DataType = unknown>(
  url: string,
  { onReceive, onFailure }: OptionsType = {}
): UseRequestReturnType<DataType> => {
  const [data, setData] = useState<DataType | undefined>(undefined);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | undefined>(undefined);

  const dispatch = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await fetch(url);
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
  }, [url]);

  const clearErrors = useCallback(() => {
    if (!error) return;
    setError(undefined);
  }, [error]);

  useEffect(() => {
    if (!data) return;
    onReceive?.();
  }, [data, onReceive]);

  return { dispatch, data, isFetching, error, clearErrors };
};
