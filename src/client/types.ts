export type ErrorResponse<ErrorResponseType = unknown> = {
  statusCode: number;
  originalError: ErrorResponseType;
};

export type OptionsType = {
  onReceive?: () => void;
  onFailure?: () => void;
  method?: MethodType;
};

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";
