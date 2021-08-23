export type ErrorResponse = {
  statusCode: number;
  originalError: unknown;
};

export type OptionsType = {
  onReceive?: () => void;
  onFailure?: () => void;
  method?: MethodType;
};

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";
