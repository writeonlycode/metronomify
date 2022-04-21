import React from "react";
import { Temporal } from "@js-temporal/polyfill";
import { ActionIcon, Affix } from "@mantine/core";
import { IconCopy } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";

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
    <ActionIcon size="xl" radius="xl" variant="filled" style={{ marginBottom: "8px" }} onClick={handleClick}>
      <IconCopy />
    </ActionIcon>
  );
};

export default CopyButton;
