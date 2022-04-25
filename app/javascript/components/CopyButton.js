import React from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCopy } from "@tabler/icons";
import { Temporal } from "@js-temporal/polyfill";

const CopyButton = ({ bpm }) => {
  const handleClick = () => {
    const nowText = Temporal.Now.plainDateISO().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const clipboardText = `${nowText}\n${bpm} bpm`;

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
      <ActionIcon
        size="xl"
        radius="xl"
        variant="filled"
        onClick={handleClick}
      >
        <IconCopy />
      </ActionIcon>
    </Tooltip>
  );
};

export default CopyButton;
