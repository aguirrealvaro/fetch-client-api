import { EndpointType } from "./types";

export const getUsers = (): EndpointType => ({
  url: "user/all",
  method: "GET",
});

export const login: EndpointType = {
  url: "user/login",
  method: "POST",
};
