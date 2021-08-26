import React, { FunctionComponent } from "react";
import { loginUser, getUsers } from "./client/endpoints";
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

type LoginResponseType = {
  success: string;
  token: string;
  id: string;
  email: string;
  name: string;
  surname: string;
  avatar: string;
};

export const App: FunctionComponent = () => {
  const onReceive = () => console.log("onReceive");
  const onFailure = () => console.log("onFailure");

  /* const body = {
    email: "alva@gmail.com",
    password: "12345",
  };

  const { data, isFetching, error, dispatch, clearErrors } = useRequest<LoginResponseType>(loginUser(body), {
    onReceive,
    onFailure,
  }); */

  const { data, isFetching, error, dispatch, clearErrors } = useRequest<UsersResponse>(getUsers(), {
    onReceive,
    onFailure,
  });

  return (
    <>
      <button onClick={() => dispatch()}>Fetch</button>
      <button onClick={() => clearErrors()}>Clear errors</button>
      <>
        {isFetching && "fetching"}
        {error && JSON.stringify(error)}
        {data && JSON.stringify(data)}
      </>
    </>
  );
};
