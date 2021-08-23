import React, { FunctionComponent } from "react";
import { useRequest } from "./client/useRequest";

type BodyType = {
  email: string;
  password?: string;
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
  };

  const { data, isFetching, error, dispatch, clearErrors } = useRequest<
    LoginResponseType,
    BodyType,
    ErrorResponseType
  >("user/login", {
    onReceive,
    onFailure,
    method: "POST",
  });

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
