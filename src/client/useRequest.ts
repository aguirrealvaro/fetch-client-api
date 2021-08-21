import { useState, useCallback } from "react";
import { ErrorResponse } from "./types";

type UseRequestReturnType<DataType> = {
  dispatch: () => Promise<void>;
  data: DataType | undefined;
  isFetching: boolean;
  error: ErrorResponse | undefined;
};

export const useRequest = <DataType = unknown>(url: string): UseRequestReturnType<DataType> => {
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

  return { dispatch, data, isFetching, error };
};
