import React from "react";
import { Modal } from "@mantine/core";
import RegistrationsNew from "./RegistrationsNew";

const RegisterModal = ({ opened, setOpened }) => {
  return (
    <Modal opened={opened} onClose={() => setOpened(false)}>
      <RegistrationsNew />
    </Modal>
  );
};

export default RegisterModal;
