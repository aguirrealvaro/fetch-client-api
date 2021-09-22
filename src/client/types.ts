export type ErrorResponseType<OriginalErrorType = unknown> = {
  statusCode: number;
  originalError?: OriginalErrorType;
};

export type OptionsType = {
  onReceive?: () => void;
  onFailure?: () => void;
  intialFetch?: boolean;
  refetchInterval?: number;
};

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";

export type EndpointType<BodyType = any> = {
  url: string;
  method?: MethodType;
  body?: BodyType;
  baseUrl?: string;
  query?: Record<string, string>;
  mock?: MockType<BodyType>;
};

export type StatusType<ResponseType, OriginalErrorType> = {
  data: ResponseType | undefined;
  isFetching: boolean;
  error: ErrorResponseType<OriginalErrorType> | undefined;
};

export type StringifyUrlType = {
  url: string;
  query: Record<string, string>;
};

export type MockType<DataType> = {
  status: "success" | "failure";
  data: DataType | ErrorResponseType;
  timeout: number;
};
