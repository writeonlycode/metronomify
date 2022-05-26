import React from "react";
import { useQuery } from "react-query";
import { Modal } from "@mantine/core";
import RegistrationsEdit from "../Users/RegistrationsEdit";
import { fetchCurrentUser } from "../../apis/users";

const ModalProfile = ({ opened, setOpened }) => {
  const currentUser = useQuery("currentUser", fetchCurrentUser);

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} zIndex="100">
      <RegistrationsEdit currentUser={currentUser} />
    </Modal>
  );
};

export default ModalProfile;
