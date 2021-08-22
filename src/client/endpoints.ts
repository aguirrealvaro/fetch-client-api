import { EndpointType } from "./types";

export const getUsers = (): EndpointType => ({
  url: "user/all",
  method: "GET",
});
