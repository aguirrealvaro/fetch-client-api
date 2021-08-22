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
  } = useRequest<UsersResponse>("http://localhost:4000/api/user/getall");

  if (isFetching) return <>Loading...</>;
  if (error) return <>Error</>;

  return (
    <>
      <button onClick={() => dispatch()}>boton</button>
      <>
        {users?.map((user) => (
          <div key={user.name}>{user.name}</div>
        ))}
      </>
    </>
  );
};
