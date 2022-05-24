import React from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconVolume, IconVolume3 } from "@tabler/icons";

const ButtonMuteMetronome = ({ muted, setMuted }) => {
  const handleClick = () => {
    setMuted((prevState) => !prevState);
  };

  return (
    <Tooltip
      label="Mute/Unmute Metronome"
      position="left"
      placement="center"
      withArrow
    >
      <ActionIcon size="xl" radius="xl" variant="filled" onClick={handleClick}>
        {muted ? <IconVolume3 /> : <IconVolume />}
      </ActionIcon>
    </Tooltip>
  );
};

export default ButtonMuteMetronome;
