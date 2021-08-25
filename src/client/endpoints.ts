import { createEndpoint } from "./utils";

type BodyType = {
  email: string;
  password: string;
};

export const login = createEndpoint((body: BodyType) => ({
  url: "user/login",
  method: "POST",
  body,
}));
