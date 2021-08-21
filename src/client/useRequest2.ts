import { useState, useCallback } from "react";
import { ErrorResponse } from "./types";

type UseRequestReturnType<DataType> = {
  dispatch: () => void;
  data: DataType | undefined;
  isFetching: boolean;
  error: ErrorResponse | undefined;
};

export const useRequest = <DataType = unknown>(url: string): UseRequestReturnType<DataType> => {
  const [data, setData] = useState<DataType | undefined>(undefined);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | undefined>(undefined);

  const dispatch = useCallback(() => {
    setIsFetching(true);

    fetch(url)
      .then((response) => Promise.all([response.ok, response.json(), response.status]))
      .then(([isSuccess, data, statusCode]) => {
        if (isSuccess) {
          setData(data);
        } else {
          setError({ statusCode, originalError: data });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [url]);

  return { dispatch, data, isFetching, error };
};
