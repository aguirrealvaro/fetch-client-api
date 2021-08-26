import { EndpointType, StringifyUrlType } from "./types";

export const createEndpoint = <TArgs extends any[], BodyType>(
  func: (...args: TArgs) => EndpointType<BodyType>
): ((...args: TArgs) => EndpointType<BodyType>) => func;

export const stringifyUrl = ({ url, query }: StringifyUrlType): string => {
  const params = new URLSearchParams(query);
  const formattedParams = params.toString();
  return `${url}?${formattedParams}`;
};
