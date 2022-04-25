import React from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons";

const SettingsButton = ({ onClick }) => {
  return (
    <ActionIcon
      size="xl"
      radius="xl"
      variant="filled"
      onClick={onClick}
    >
      <IconAdjustments />
    </ActionIcon>
  );
};

export default SettingsButton;
