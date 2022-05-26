import React, { useState } from "react";
import { ActionIcon, Menu } from "@mantine/core";
import { IconDotsVertical, IconKey, IconLogin, IconUserPlus } from "@tabler/icons";

import LoginModal from "../Users/LoginModal";
import RegisterModal from "../Users/RegisterModal";
import PasswordsNewModal from "../Users/PasswordsNewModal";

const MenuUserSignedOut = ({ loading }) => {
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [registerModalOpened, setRegisterModalOpened] = useState(false);
  const [resetPasswordModalOpened, setResetPasswordModalOpened] = useState(false);

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
        <Menu.Item
          onClick={() => setRegisterModalOpened(true)}
          icon={<IconUserPlus size={14} />}
        >
          Register
        </Menu.Item>
        <Menu.Item
          onClick={() => setResetPasswordModalOpened(true)}
          icon={<IconKey size={14} />}
        >
          Reset Password
        </Menu.Item>
      </Menu>
      <LoginModal opened={loginModalOpened} setOpened={setLoginModalOpened} />
      <RegisterModal
        opened={registerModalOpened}
        setOpened={setRegisterModalOpened}
      />
      <PasswordsNewModal
        opened={resetPasswordModalOpened}
        setOpened={setResetPasswordModalOpened}
      />
    </>
  );
};

export default MenuUserSignedOut;
