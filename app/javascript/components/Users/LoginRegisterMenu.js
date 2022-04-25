import React, { useState } from "react";
import { ActionIcon, Avatar, Menu, Text } from "@mantine/core";
import { IconDotsVertical, IconLogin, IconUserPlus } from "@tabler/icons";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const LoginRegisterMenu = ({ loading }) => {
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [registerModalOpened, setRegisterModalOpened] = useState(false);

  return (
    <>
      <Menu
        position="left"
        control={
          <ActionIcon
            loading={loading}
            loaderProps={{ size: "xs", variant: "dots" }}
            size="xl"
            radius="xl"
            variant="filled"
            style={{ marginBottom: "8px" }}
          >
            <IconDotsVertical />
          </ActionIcon>
        }
      >
        <Menu.Item
          onClick={() => setLoginModalOpened(true)}
          icon={<IconLogin size={14} />}
        >
          Login
        </Menu.Item>
        {/*
        <Menu.Item
          onClick={() => setRegisterModalOpened(true)}
          icon={<IconUserPlus size={14} />}
        >
          Register
        </Menu.Item>
        */}
      </Menu>
      <LoginModal opened={loginModalOpened} setOpened={setLoginModalOpened} />
      <RegisterModal
        opened={registerModalOpened}
        setOpened={setRegisterModalOpened}
      />
    </>
  );
};

export default LoginRegisterMenu;
