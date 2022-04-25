import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ActionIcon, Avatar, Menu } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconLogout, IconUser } from "@tabler/icons";
import { signOut } from "../../apis/users";

const UserMenu = ({ currentUser }) => {
  const queryClient = useQueryClient();

  const signOutMutation = useMutation(signOut, {
    onSettled: () => queryClient.invalidateQueries("currentUser"),
    onSuccess: (data) => {
      showNotification({
        title: "Goodbye!",
        message: "You are now logged out.",
      });
    },
    onError: (data) => {
      showNotification({
        color: "red",
        title: "Ops, something is wrong...",
        message: data.error,
      });
    },
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
        <Menu.Label>{currentUser.data.email}</Menu.Label>
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
