import React from "react";
import { Modal } from "@mantine/core";
import PasswordsNew from "./PasswordsNew";

const PasswordsNewModal = ({ opened, setOpened }) => {
  return (
    <Modal opened={opened} onClose={() => setOpened(false)}>
      <PasswordsNew />
    </Modal>
  );
};

export default PasswordsNewModal;
