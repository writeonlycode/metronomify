import React from "react";
import { Modal } from "@mantine/core";

const RegisterModal = ({ opened, setOpened }) => {
  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Register">
      Modal Content
    </Modal>
  );
};

export default RegisterModal;
