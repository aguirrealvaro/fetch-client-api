import { createEndpoint } from "./utils";

type BodyType = {
  email: string;
  password: string;
};

export const loginUser = createEndpoint((body: BodyType) => ({
  url: "user/login",
  method: "POST",
  body,
}));

export const getUsers = createEndpoint(() => ({
  url: "user/all",
}));
