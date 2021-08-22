export type ErrorResponse = {
  statusCode: number;
  originalError: unknown;
};

export type OptionsType = {
  onReceive?: () => void;
  onFailure?: () => void;
};

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";

export type EndpointType = {
  url: string;
  method: MethodType;
  body?: string;
};
