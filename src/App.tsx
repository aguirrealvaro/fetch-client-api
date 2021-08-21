import React, { FunctionComponent, useEffect } from "react";
//import { useRequest } from "./client/useRequest";
import { useRequest } from "./client/useRequest2";

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
    dispatch,
    data: users,
    isFetching,
    error,
  } = useRequest<UsersResponse>("http://localhost:4000/api/user/getall");

  useEffect(() => {
    dispatch();
  }, [dispatch]);

  if (isFetching) return <>Loading...</>;
  if (error) return <>Error</>;

  return (
    <>
      {users?.map((user) => (
        <>{user.name}</>
      ))}
    </>
  );
};
