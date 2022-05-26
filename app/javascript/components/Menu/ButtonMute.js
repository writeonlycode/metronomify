import React, { useContext } from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconVolume, IconVolume3 } from "@tabler/icons";

import { SettingsMetronomeContext } from "../Providers";

const ButtonMute = () => {
  const [settingsMetronome, setSettingsMetronome] = useContext(
    SettingsMetronomeContext
  );

  return (
    <Tooltip
      label="Mute/Unmute Metronome"
      position="left"
      placement="center"
      withArrow
    >
      <ActionIcon
        size="xl"
        radius="xl"
        variant="filled"
        onClick={() => {
          setSettingsMetronome((prevState) => ({
            ...prevState,
            muted: !prevState.muted,
          }));
        }}
      >
        {settingsMetronome.muted ? <IconVolume3 /> : <IconVolume />}
      </ActionIcon>
    </Tooltip>
  );
};

export default ButtonMute;
