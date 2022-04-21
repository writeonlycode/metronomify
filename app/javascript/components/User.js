import React, { useEffect, useState } from "react";
import { ActionIcon } from "@mantine/core";
import { IconLogin, IconUser } from "@tabler/icons";
import { useQuery } from "react-query";

async function fetchCurrentUser() {
  const res = await fetch("/users");
  return res.json();
}

const User = () => {
  const user = useQuery("user", fetchCurrentUser);

  return (
    <ActionIcon
      size="xl"
      radius="xl"
      variant="filled"
      style={{ marginBottom: "8px" }}
    >
      {user.isSuccess ? <IconUser /> : <IconLogin />}
    </ActionIcon>
  );
};

export default User;
