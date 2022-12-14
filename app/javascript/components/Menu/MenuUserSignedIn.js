import React, { useContext, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "react-query";

import { ActionIcon, Divider, Menu } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import {
  IconDashboard,
  IconLogout,
  IconReport,
  IconSettings,
  IconUser,
} from "@tabler/icons";

import ModalProfile from "./ModalProfile";
import ModalSettings from "./ModalSettings";

import DrawerDashboard from "../Dashboard/DrawerDashboard";
import DrawerReports from "../Reports/DrawerReports";

import { fetchCurrentUser } from "../../apis/users";
import { signOut } from "../../apis/users";

import { SettingsApplicationContext } from "../Providers";

const MenuUserSignedIn = () => {
  const settingsApplication = useContext(SettingsApplicationContext);

  const currentUser = useQuery("currentUser", fetchCurrentUser);

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

  const [profileModalOpened, setProfileModalOpened] = useState(false);

  return (
    <>
      <Menu position="left-start">
        <Menu.Target>
          <ActionIcon
            loading={currentUser.isLoading}
            size="xl"
            radius="xl"
            variant="outline"
          >
            <IconUser />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{currentUser.data?.email}</Menu.Label>
          <Menu.Item
            onClick={() => settingsApplication.setDashboardOpened(true)}
            icon={<IconDashboard size={14} />}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            onClick={() => settingsApplication.setReportsOpened(true)}
            icon={<IconReport size={14} />}
          >
            Reports
          </Menu.Item>
          <Divider />
          <Menu.Item
            onClick={() => setProfileModalOpened(true)}
            icon={<IconUser size={14} />}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            onClick={() => settingsApplication.setSettingsOpened(true)}
            icon={<IconSettings size={14} />}
          >
            Settings
          </Menu.Item>
          <Divider />
          <Menu.Item
            onClick={() => signOutMutation.mutate()}
            icon={<IconLogout size={14} />}
          >
            Log Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <DrawerDashboard
        opened={settingsApplication.dashboardOpened}
        setOpened={settingsApplication.setDashboardOpened}
      />
      <DrawerReports
        opened={settingsApplication.reportsOpened}
        setOpened={settingsApplication.setReportsOpened}
      />
      <ModalProfile
        opened={profileModalOpened}
        setOpened={setProfileModalOpened}
      />
      <ModalSettings
        opened={settingsApplication.settingsOpened}
        setOpened={settingsApplication.setSettingsOpened}
      />
    </>
  );
};

export default MenuUserSignedIn;
