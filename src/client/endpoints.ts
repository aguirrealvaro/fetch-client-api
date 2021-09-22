import { decamelizeKeys } from "humps";
import { createEndpoint } from "./utils";

type BodyType = {
  email: string;
  password: string;
};

export const loginUser = createEndpoint((body: BodyType) => ({
  url: "user/login",
  method: "POST",
  body: decamelizeKeys(body),
}));

export const getUsers = createEndpoint(() => ({
  url: "user/all",
  method: "GET",
}));

export const getCurrent = createEndpoint(() => ({
  url: "user/current",
  method: "GET",
}));
