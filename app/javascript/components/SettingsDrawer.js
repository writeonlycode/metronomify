import React from "react";
import { Checkbox, Drawer, Space } from "@mantine/core";
import BeatsInput from "./BeatsInput";
import TimerInput from "./TimerInput";

const SettingsDrawer = ({ opened, setOpened, beats, setBeats, timer, emphasis, setEmphasis }) => {
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title="Settings"
      padding="xl"
      size="xl"
      position="right"
      transitionDuration={500}
    >
      <Space h="2rem" />
      <BeatsInput
        label="Beats"
        value={beats}
        onChange={(value) => setBeats(value)}
      />
      <Space h="1rem" />
      <TimerInput
        label="Timer"
        timer={timer}
        // value={{minutes: timer.minutes, seconds: timer.seconds}}
        // onChange={(value) => setTimer(value)}
      />
      <Space h="1rem" />
      <Checkbox
        label="Emphasis on First Beat"
        styles={{
          root: {
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            height: "36px"
          },
          label: { paddingLeft: 0, textTransform: "uppercase", fontSize: "14px" },
          input: { cursor: "pointer" },
        }}
        checked={emphasis}
        onChange={(e) => setEmphasis(e.currentTarget.checked)}
      />
    </Drawer>
  );
};

export default SettingsDrawer;
