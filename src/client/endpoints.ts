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

const data = [
  {
    avatar: null,
    points: 1,
    level: 1,
    id: "5e901738cbddc62eb03dc520",
    email: "alva@gmail.com",
    password: "$2a$10$0TNcP0laiFJWVQXhkB9afOKfcg4WL1c2pnB0GOf28vinOpOhtM9oq",
    name: "alva",
    surname: "aguirre",
    createdAt: "2020-04-10T06:50:32.136Z",
    v: 0,
  },
  {
    avatar: null,
    points: 1,
    level: 1,
    id: "5e92ca7cbaf48a17dc32b42e",
    email: "fer@gmail.com",
    password: "$2a$10$riT65cUXpD3ZxuxhTYoE.uNfPjQeVvxoyJ1CWJ7/.4og..KF1cbZW",
    name: "fer",
    surname: "aguirre",
    createdAt: "2020-04-12T07:59:56.791Z",
    v: 0,
  },
];

export const getUsers = createEndpoint(() => ({
  url: "user/all",
  method: "GET",
  mock: {
    status: "success",
    data,
    timeout: 2000,
  },
}));

export const getCurrent = createEndpoint(() => ({
  url: "user/current",
  method: "GET",
}));
