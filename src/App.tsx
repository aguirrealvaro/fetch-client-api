import React, { FunctionComponent } from "react";
import { getUsers, login } from "./client/endpoints";
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

export const App: FunctionComponent = () => {
  const onReceive = () => console.log("onReceive");
  const onFailure = () => console.log("onFailure");

  const body = {
    email: "alva@gmail.com",
    password: "1234",
  };

  const { data, isFetching, error, dispatch, clearErrors } = useRequest(login<BodyType>(body), {
    onReceive,
    onFailure,
  });

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
