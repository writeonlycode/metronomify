import React, { useContext } from "react";
import { ActionIcon, Group, Slider, Text } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons";

import {
  SettingsMetronomeContext,
} from "../Providers";

const DisplayBpm = ({ bpm, setBpm }) => {
  const [settingsMetronome, setSettingsMetronome] = useContext(
    SettingsMetronomeContext
  );

  return (
    <div className="BpmDisplay">
      <Text size="xl" align="center">
        {settingsMetronome.bpm}
      </Text>
      <Group position="center">
        <ActionIcon
          size="lg"
          radius="xl"
          variant="filled"
          style={{ flexGrow: 0, fontSize: "2em" }}
          onClick={() =>
            setSettingsMetronome((prevValue) => ({
              ...prevValue,
              bpm: prevValue.bpm - 1,
            }))
          }
        >
          <IconMinus />
        </ActionIcon>
        <Slider
          value={settingsMetronome.bpm}
          onChange={(value) =>
            setSettingsMetronome((prevValue) => ({ ...prevValue, bpm: value }))
          }
          min={20}
          max={240}
          style={{ flexGrow: 1 }}
          size="xl"
          label={null}
          // Prevents triggering the increate/decrease twice
          onKeyDown={(e) => {
            if (
              e.type === "keydown" &&
              (e.code === "ArrowLeft" || e.code === "ArrowRight")
            )
              e.stopPropagation();
          }}
        />
        <ActionIcon
          size="lg"
          radius="xl"
          variant="filled"
          style={{ flexGrow: 0, fontSize: "2em" }}
          onClick={() =>
            setSettingsMetronome((prevValue) => ({
              ...prevValue,
              bpm: prevValue.bpm + 1,
            }))
          }
        >
          <IconPlus />
        </ActionIcon>
      </Group>
    </div>
  );
};

export default DisplayBpm;
