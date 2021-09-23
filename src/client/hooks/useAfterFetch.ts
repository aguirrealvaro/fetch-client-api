import { useEffect } from "react";
import { ErrorResponseType } from "../types";

export const useAfterFetch = <ResponseType, OriginalErrorType>(
  data: ResponseType | undefined,
  error: ErrorResponseType<OriginalErrorType> | undefined,
  onReceive: (() => void) | undefined,
  onFailure: (() => void) | undefined
): void => {
  useEffect(() => {
    if (!data) return;
    onReceive?.();
  }, [data]);

  useEffect(() => {
    if (!error) return;
    onFailure?.();
  }, [error]);
};
