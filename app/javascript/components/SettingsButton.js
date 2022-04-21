import React from "react";
import { ActionIcon } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons";

const SettingsButton = ({ onClick }) => {
  return (
    <ActionIcon
      size="xl"
      radius="xl"
      variant="filled"
      style={{ marginBottom: "8px" }}
      onClick={onClick}
    >
      <IconAdjustments />
    </ActionIcon>
  );
};

export default SettingsButton;
