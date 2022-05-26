import React, { useContext } from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCopy } from "@tabler/icons";

import { SettingsMetronomeContext } from "../Providers";

const ButtonCopy = () => {
  const [settingsMetronome, setSettingsMetronome] = useContext(
    SettingsMetronomeContext
  );

  const handleClick = () => {
    const clipboardText = `${new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}\n${settingsMetronome.bpm} bpm`;

    navigator.clipboard.writeText(clipboardText).then(() => {
      showNotification({
        title: "Date and BPM copied to the clipboard!",
        message: clipboardText,
      });
    });
  };

  return (
    <Tooltip
      label="Copy date and BPM to the clipboard"
      position="left"
      placement="center"
      withArrow
    >
      <ActionIcon size="xl" radius="xl" variant="filled" onClick={handleClick}>
        <IconCopy />
      </ActionIcon>
    </Tooltip>
  );
};

export default ButtonCopy;
