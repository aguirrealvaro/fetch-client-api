import React, { FunctionComponent } from "react";
import { login } from "./client/endpoints";
import { useRequest } from "@/client";

type UsersResponse = {
  avatar: string;
  createdAt: string;
  email: string;
  level: number;
  name: string;
  password: string;
  points: number;
  surname: string;
}[];

type BodyType = {
  email: string;
  password: string;
};

type LoginResponseType = {
  success: string;
  token: string;
  id: string;
  email: string;
  name: string;
  surname: string;
  avatar: string;
};

type ErrorResponseType = {
  errors: {
    email?: string;
    password?: string;
  };
};

export const App: FunctionComponent = () => {
  const onReceive = () => console.log("onReceive");
  const onFailure = () => console.log("onFailure");

  const body = {
    email: "alva@gmail.com",
    password: "1234",
  };

  const { data, isFetching, error, dispatch, clearErrors } = useRequest<LoginResponseType>(login(body), {
    onReceive,
    onFailure,
  });

  /* const { data, isFetching, error, dispatch, clearErrors } = useRequest<UsersResponse>("user/all", {
    onReceive,
    onFailure,
    intialFetch: true,
    refetchInterval: 5000,
  }); */

  return (
    <>
      <button onClick={() => dispatch()}>boton</button>
      <button onClick={() => clearErrors()}>Clear errors</button>
      <>
        {isFetching && "fetching"}
        {error && JSON.stringify(error)}
        {data && JSON.stringify(data)}
      </>
    </>
  );
};
