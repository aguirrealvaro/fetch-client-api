export type ErrorResponse<ErrorType> = {
  statusCode: number;
  originalError?: ErrorType;
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
};

export type StatusType<ResponseType, ErrorType> = {
  data: ResponseType | undefined;
  isFetching: boolean;
  error: ErrorResponse<ErrorType> | undefined;
};

export type StringifyUrlType = {
  url: string;
  query: Record<string, string>;
};
