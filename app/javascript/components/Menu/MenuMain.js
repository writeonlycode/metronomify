import React from "react";

import { useQuery } from "react-query";
import { fetchCurrentUser } from "../../apis/users";

import { Affix } from "@mantine/core";

import MenuUserSignedIn from "./MenuUserSignedIn";
import MenuUserSignedOut from "./MenuUserSignedOut";
import ButtonCopy from "./ButtonCopy";
import ButtonMute from "./ButtonMute";

const MenuMain = () => {
  const currentUser = useQuery("currentUser", fetchCurrentUser);

  return (
    <Affix
      position={{ top: 32, right: 32 }}
      style={{ display: "flex", flexDirection: "column", gap: "8px" }}
    >
        {currentUser.data ? <MenuUserSignedIn /> : <MenuUserSignedOut />}
      <ButtonCopy />
      <ButtonMute />
    </Affix>
  );
};

export default MenuMain;
