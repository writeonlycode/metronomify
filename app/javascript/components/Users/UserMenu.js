import React, { useState } from "react";
import { ActionIcon, Avatar, Menu } from "@mantine/core";
import { IconLogout, IconUser } from "@tabler/icons";
import {signOut} from "../../apis/users";
import {useMutation, useQueryClient} from "react-query";

const UserMenu = ({ currentUser }) => {
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [registerModalOpened, setRegisterModalOpened] = useState(false);

  const queryClient = useQueryClient()

  const signOutMutation = useMutation(signOut, {
    onSettled: () => queryClient.invalidateQueries('currentUser'),
    onSuccess: () => { /* update csrf token*/}
  });


  return (
    <>
      <Menu
        position="left"
        control={
          <ActionIcon
            loading={currentUser?.isLoading}
            size="xl"
            radius="xl"
            variant="filled"
            style={{ marginBottom: "8px" }}
          >
              <IconUser />
          </ActionIcon>
        }
      >
        {/*
        <Menu.Item
          onClick={() => setLoginModalOpened(true)}
          icon={<IconUser size={14} />}
        >
          Profile
        </Menu.Item>
        */}
        <Menu.Item
          onClick={() => signOutMutation.mutate()}
          icon={<IconLogout size={14} />}
        >
              Log Out
        </Menu.Item>
      </Menu>
    </>
  );
};

export default UserMenu;
