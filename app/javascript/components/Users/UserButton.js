import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import LoginRegisterMenu from "./LoginRegisterMenu";
import UserMenu from "./UserMenu";

import { fetchCurrentUser } from "../../apis/users";

const User = () => {
  const currentUser = useQuery("currentUser", fetchCurrentUser);

  return currentUser?.data?.email ? (
    <UserMenu currentUser={currentUser} />
  ) : (
    <LoginRegisterMenu loading={currentUser?.isLoading} />
  );
};

export default User;
