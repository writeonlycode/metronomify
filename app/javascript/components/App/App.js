import React, { useEffect, useState } from "react";

import { Affix } from "@mantine/core";
import { useToggle } from "@mantine/hooks";

import MainContainer from "../MainContainer";
import MainContent from "../MainContent";
import UserButton from "../Users/UserButton";
import SettingsButton from "../SettingsButton";
import SettingsDrawer from "../SettingsDrawer";
import CopyButton from "../CopyButton";
import PasswordsEditModal from "../Users/PasswordsEditModal";

import useMetronome from "../../hooks/useMetronome/useMetronome";
import useTimer from "../../hooks/useTimer";
import useTone from "../../hooks/useTone";


const App = () => {
  const metronome = useMetronome({ bpm: 60, beats: 4, emphasis: true });
  const [running, toggle] = useToggle(false, [true, false]);

  const tone = useTone();
  const timer = useTimer({ minutes: 5 }, () => tone.playAlarm());

  const [settingsOpened, setSettingsOpened] = useState(false);
  const [resetPasswordToken, setResetPasswordToken] = useState(null);

  useEffect( () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if ( params.reset_password_token ) {
      setResetPasswordToken(params.reset_password_token);
    }
    
  }, []);

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

  return (
    <MainContainer>
      <Affix position={{ top: 32, right: 32 }} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <UserButton />
        <SettingsButton onClick={() => setSettingsOpened(true)} />
        <CopyButton bpm={metronome.bpm} />
      </Affix>
      <MainContent
        bpm={metronome.bpm}
        setBpm={metronome.setBpm}
        toggle={toggle}
        beats={metronome.beats}
        beat={metronome.beat}
        timer={timer}
        running={running}
      />
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
      <PasswordsEditModal
        resetPasswordToken={resetPasswordToken}
      />
    </MainContainer>
  );
};

export default App;
