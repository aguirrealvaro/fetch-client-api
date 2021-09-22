import { Dispatch, useEffect, useRef } from "react";
import { ErrorResponseType, MockType, StatusType } from "../types";

type UseMockReturnType = {
  mockDispatch: () => void;
};

export const useMock = <ResponseType, OriginalErrorType>(
  mock: MockType<ResponseType | ErrorResponseType> | undefined,
  setState: Dispatch<React.SetStateAction<StatusType<ResponseType, OriginalErrorType>>>
): UseMockReturnType => {
  const timeoutRef = useRef<number>(0);

  const mockDispatch = () => {
    if (!mock) return;
    const { status, data, timeout } = mock;
    setState((state) => ({ ...state, isFetching: true }));

    timeoutRef.current = window.setTimeout(() => {
      setState((state) => ({
        ...state,
        isFetching: false,
        ...(status === "success"
          ? { data: data as ResponseType }
          : { error: data as ErrorResponseType<OriginalErrorType> }),
      }));
    }, timeout);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  });

  return { mockDispatch };
};
