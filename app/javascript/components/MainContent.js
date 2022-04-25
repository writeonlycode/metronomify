import React from "react";

import { Button, Space } from "@mantine/core";
import { useHotkeys  } from "@mantine/hooks";

import BpmDisplay from "./BpmDisplay/BpmDisplay";
import BeatsDisplay from "./BeatsDisplay/BeatsDisplay";
import TimerDisplay from "./TimerDisplay";

const MainContent = ({bpm, setBpm, toggle, beats, beat, timer, running}) => {
  useHotkeys([
    ['ArrowRight', () => setBpm((prevCount) => prevCount + 1)],
    ['ArrowLeft', () => setBpm((prevCount) => prevCount - 1)],
    ['PageUp', () => setBpm((prevCount) => prevCount + 10)],
    ['PageDown', () => setBpm((prevCount) => prevCount - 10)],
    ['Space', () => toggle()],
  ]);

  return (
    <>
      <BpmDisplay bpm={bpm} setBpm={setBpm} />
      <div>
        <Space h="2rem" />
        <BeatsDisplay total={beats} current={beat} />
        <Space h="6rem" />
        <TimerDisplay timer={timer} />
        <Space h="6rem" />
        <Button fullWidth size="lg" uppercase onClick={() => toggle()}>
          {running ? "STOP" : "START"}
        </Button>
      </div>
    </>
  );
};

export default MainContent;
