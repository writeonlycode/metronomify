import React from "react";
import { Modal } from "@mantine/core";
import PasswordsEdit from "./PasswordsEdit";

const PasswordsEditModal = ({ resetPasswordToken }) => {
  return (
    <Modal centered opened={resetPasswordToken} closeOnEscape={false} closeOnClickOutside={false} withCloseButton={false} >
      <PasswordsEdit resetPasswordToken={resetPasswordToken}/>
    </Modal>
  );
};

export default PasswordsEditModal;
