import { EndpointType } from "./types";

export const createEndpoint = <TArgs extends any[]>(
  func: (...args: TArgs) => EndpointType
): ((...args: TArgs) => EndpointType) => func;
