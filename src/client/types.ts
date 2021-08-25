export type ErrorResponse<ErrorResponseType = unknown> = {
  statusCode: number;
  originalError: ErrorResponseType;
};

export type OptionsType = {
  onReceive?: () => void;
  onFailure?: () => void;
  intialFetch?: boolean;
  refetchInterval?: number;
};

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";

export type EndpointType = {
  url: string;
  method: MethodType;
  body: any;
};
