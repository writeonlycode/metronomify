import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ActionIcon, Avatar, Menu, Tooltip } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconDashboard, IconLogout, IconUser } from "@tabler/icons";
import { signOut } from "../../apis/users";
import ProfileModal from "./ProfileModal";
import DrawerDashboard from "../Dashboard/DrawerDashboard";

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

  const [dashboardModalOpened, setDashboardModalOpened] = useState(false);
  const [profileModalOpened, setProfileModalOpened] = useState(false);

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
          >
            <IconUser />
          </ActionIcon>
        }
      >
        <Menu.Label>{currentUser.data.email}</Menu.Label>
        <Menu.Item
          onClick={() => setDashboardModalOpened(true)}
          icon={<IconDashboard size={14} />}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          onClick={() => setProfileModalOpened(true)}
          icon={<IconUser size={14} />}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          onClick={() => signOutMutation.mutate()}
          icon={<IconLogout size={14} />}
        >
          Log Out
        </Menu.Item>
      </Menu>
      <DrawerDashboard
        opened={dashboardModalOpened}
        setOpened={setDashboardModalOpened}
      />
      <ProfileModal
        currentUser={currentUser}
        opened={profileModalOpened}
        setOpened={setProfileModalOpened}
      />
    </>
  );
};

export default UserMenu;
