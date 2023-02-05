import React from "react";

import { CircleLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../../services/APIUtils";

const User = () => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["users"],
    onSuccess: () => console.log("SUCCESS"),
    queryFn: getUsers,
    // placeholderData: () => [
    //   { firstName: "Sam", lastName: "Njenga", email: "sam@gmail.com" },
    // ],
  });
  if (isLoading) {
    return (
      <div>
        <CircleLoader color="#36d7b7" />
      </div>
    );
  }

  if (isError) return <pre>{JSON.stringify(error.message)}</pre>;

  return (
    <div>
      <h4>Users List</h4>
      {data?.data?.map((user) => {
        return <div key={user.id}>{user.firstName}</div>;
      })}
    </div>
  );
};

export default User;
