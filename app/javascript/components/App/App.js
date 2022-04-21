import React, { useEffect, useState } from "react";

import { Button, Space, Checkbox, Affix } from "@mantine/core";
import { useToggle, useWindowEvent } from "@mantine/hooks";

import MainContainer from "../MainContainer";
import BpmDisplay from "../BpmDisplay/BpmDisplay";
import BeatsDisplay from "../BeatsDisplay/BeatsDisplay";
import TimerDisplay from "../TimerDisplay";
import SettingsButton from "../SettingsButton";
import SettingsDrawer from "../SettingsDrawer";

import useMetronome from "../../hooks/useMetronome/useMetronome";
import useTimer from "../../hooks/useTimer";
import useTone from "../../hooks/useTone";
import CopyButton from "../CopyButton";
import User from "../User";


const App = () => {
  const [running, toggle] = useToggle(false, [true, false]);
  const metronome = useMetronome({ bpm: 60, beats: 4, emphasis: true });

  const tone = useTone();
  const timer = useTimer({ minutes: 5 }, () => tone.playAlarm());

  useEffect(() => {
    if (running) {
      metronome.start();
      timer.start();
    } else {
      metronome.stop();
      timer.stop();
      timer.reset();
    }
  }, [running]);

  const [settingsOpened, setSettingsOpened] = useState(false);

  const handler = (event) => {
    switch (event.code) {
      case "Space":
        event.preventDefault();
        toggle();
        break;

      case "ArrowLeft":
        event.preventDefault();
        metronome.setBpm((prevCount) => prevCount - 1);
        break;

      case "ArrowRight":
        event.preventDefault();
        metronome.setBpm((prevCount) => prevCount + 1);
        break;

      case "PageUp":
        event.preventDefault();
        metronome.setBpm((prevCount) => prevCount + 10);
        break;

      case "PageDown":
        event.preventDefault();
        metronome.setBpm((prevCount) => prevCount - 10);
        break;
    }
  };

  useWindowEvent("keydown", handler);

  return (
    <MainContainer>
      <Affix position={{ top: 32, right: 32 }}>
        <User />
        <SettingsButton onClick={() => setSettingsOpened(true)} />
        <CopyButton bpm={metronome.bpm} />
      </Affix>
      <BpmDisplay
        bpm={metronome.bpm}
        setBpm={metronome.setBpm}
      />
      <div>
        <Space h="2rem" />
        <BeatsDisplay total={metronome.beats} current={metronome.beat} />
        <Space h="6rem" />
        <TimerDisplay timer={timer} />
        <Space h="6rem" />
        <Button fullWidth size="lg" uppercase onClick={() => toggle()}>
          {running ? "STOP" : "START"}
        </Button>
        <SettingsDrawer
          opened={settingsOpened}
          setOpened={() => setSettingsOpened(false)}
          beats={metronome.beats}
          setBeats={metronome.setBeats}
          timer={timer}
          emphasis={metronome.emphasis}
          setEmphasis={metronome.setEmphasis}
          running={running}
        />
      </div>
    </MainContainer>
  );
};

export default App;
