import { Dispatch } from "react";
import { ErrorResponse, MockType, StatusType } from "../types";

type UseMockReturnType = {
  mockDispatch: () => void;
};

export const useMock = <ResponseType, ErrorType>(
  mock: MockType<ResponseType | ErrorResponse> | undefined,
  setState: Dispatch<React.SetStateAction<StatusType<ResponseType, ErrorType>>>
): UseMockReturnType => {
  const mockDispatch = () => {
    if (!mock) return;
    const { status, data, timeout } = mock;
    setState((state) => ({ ...state, isFetching: true }));
    setTimeout(() => {
      setState((state) => ({
        ...state,
        isFetching: false,
        ...(status === "success"
          ? { data: data as ResponseType }
          : { error: data as ErrorResponse<ErrorType> }),
      }));
    }, timeout);
  };

  return { mockDispatch };
};
