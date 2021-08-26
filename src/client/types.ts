export type ErrorResponse = {
  statusCode: number;
  originalError: unknown;
};

export type OptionsType = {
  onReceive?: () => void;
  onFailure?: () => void;
  intialFetch?: boolean;
  refetchInterval?: number;
};

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";

export type EndpointType<BodyType> = {
  url: string;
  method?: MethodType;
  body?: BodyType;
};
