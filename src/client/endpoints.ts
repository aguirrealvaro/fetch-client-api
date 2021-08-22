import { EndpointType } from "./types";

export const getUsers = (): EndpointType => ({
  url: "http://localhost:4000/api/user/getall",
  method: "GET",
});
