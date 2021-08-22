import { EndpointType } from "./types";

export const getUsers = (): EndpointType => ({
  url: "user/all",
  method: "GET",
});

export const login = <BodyType>(body: BodyType): EndpointType => ({
  url: "user/login",
  method: "POST",
  body: JSON.stringify(body),
});
