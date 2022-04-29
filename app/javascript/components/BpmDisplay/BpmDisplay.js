import React from "react";
import { ActionIcon, Group, Slider, Text } from "@mantine/core";
import {IconMinus, IconPlus} from "@tabler/icons";

const BpmDisplay = ({ bpm, setBpm }) => {
  return (
    <div
      className="BpmDisplay"
    >
      <Text size="xl" align="center">
        {bpm}
      </Text>
      <Group position="center">
        <ActionIcon
          size="lg"
          radius="xl"
          variant="filled"
          style={{ flexGrow: 0, fontSize: "2em" }}
          onClick={() => setBpm((prevCount) => prevCount - 1)}
        >
          <IconMinus />
        </ActionIcon>
        <Slider
          value={bpm}
          onChange={setBpm}
          min={20}
          max={240}
          style={{ flexGrow: 1 }}
          size="xl"
          label={null}
          // Prevents triggering the increate/decrease twice
          onKeyDown={(e) => e.stopPropagation()}
        />
        <ActionIcon
          size="lg"
          radius="xl"
          variant="filled"
          style={{ flexGrow: 0, fontSize: "2em" }}
          onClick={() => setBpm((prevCount) => prevCount + 1)}
        >
          <IconPlus />
        </ActionIcon>
      </Group>
    </div>
  );
};

export default BpmDisplay;
