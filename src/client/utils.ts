import { EndpointType } from "./types";

export const createEndpoint = <TArgs extends any[], BodyType>(
  func: (...args: TArgs) => EndpointType<BodyType>
): ((...args: TArgs) => EndpointType<BodyType>) => func;
