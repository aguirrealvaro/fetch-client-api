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

export const App: FunctionComponent = () => {
  const {
    data: users,
    isFetching,
    error,
    dispatch,
    clearErrors,
  } = useRequest<UsersResponse>("http://localhost:4000/api/user/getall");

  console.log(error);

  return (
    <>
      <button onClick={() => dispatch()}>boton</button>
      <button onClick={() => clearErrors()}>Clear errors</button>
      <>
        {isFetching && "fetching"}
        {error && "error"}
        {users?.map((user) => (
          <div key={user.name}>{user.name}</div>
        ))}
      </>
    </>
  );
};
