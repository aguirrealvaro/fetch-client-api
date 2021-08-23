import React, { FunctionComponent } from "react";
import { useRequest } from "./client/useRequest";

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

export const App: FunctionComponent = () => {
  const onReceive = () => console.log("onReceive");
  const onFailure = () => console.log("onFailure");

  /* const { data, isFetching, error, dispatch, clearErrors } = useRequest<UsersResponse>("user/all", {
    onReceive,
    onFailure,
  }); */

  const body = {
    email: "alva@gmail.com",
    password: "1234",
    method: "POST",
  };

  const { data, isFetching, error, dispatch, clearErrors } = useRequest<LoginResponseType, BodyType>(
    "user/login",
    {
      onReceive,
      onFailure,
      method: "POST",
    }
  );

  return (
    <>
      <button onClick={() => dispatch(body)}>boton</button>
      <button onClick={() => clearErrors()}>Clear errors</button>
      <>
        {isFetching && "fetching"}
        {error && JSON.stringify(error)}
        {data && JSON.stringify(data)}
      </>
    </>
  );
};
