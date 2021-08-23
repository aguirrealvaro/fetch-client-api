export type ErrorResponse<ErrorResponseType = unknown> = {
  statusCode: number;
  originalError: ErrorResponseType;
};

export type OptionsType = {
  onReceive?: () => void;
  onFailure?: () => void;
  method?: MethodType;
  intialFetch?: boolean;
  refetchInterval?: number;
};

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";
