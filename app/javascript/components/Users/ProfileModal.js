import React from "react";
import { Modal } from "@mantine/core";
import RegistrationsEdit from "./RegistrationsEdit";

const ProfileModal = ({ currentUser, opened, setOpened }) => {
  return (
    <Modal opened={opened} onClose={() => setOpened(false)} zIndex="100">
      <RegistrationsEdit currentUser={currentUser} />
    </Modal>
  );
};

export default ProfileModal;
