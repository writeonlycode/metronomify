import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { Affix } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import {showNotification} from "@mantine/notifications";

import MainContainer from "../MainContainer";
import MainContent from "../MainContent";
import UserButton from "../Users/UserButton";
import SettingsButton from "../SettingsButton";
import SettingsDrawer from "../SettingsDrawer";
import CopyButton from "../CopyButton";
import ButtonMuteMetronome from "../ButtonMuteMetronome";
import PasswordsEditModal from "../Users/PasswordsEditModal";

import useMetronome from "../../hooks/useMetronome/useMetronome";
import useTimer from "../../hooks/useTimer";
import { createTimeEntry } from "../../apis/timeEntries";

const App = () => {
  const metronome = useMetronome({ bpm: 60, beats: 4, emphasis: true });
  const [running, toggle] = useToggle(false, [true, false]);
  const [muted, setMuted] = useState(false);

  const firstMutedEffect = useRef(true);

  const queryClient = useQueryClient();

  const createTimeEntryMutation = useMutation(createTimeEntry, {
    onSettled: () => {
      queryClient.invalidateQueries(["timeEntries"]);
    },
    onSuccess: (data) => {
      showNotification({
        title: "The time entry has been created successfully.",
      });
    },
    onError: (errors) => {
      showNotification({
        color: "red",
        title: "Ops, something is wrong...",
        message: errors.join(". ").concat("."),
      });
    },
  });

  const onExpiry = (values) => {
    createTimeEntryMutation.mutate(values);
  }

  const timer = useTimer({ minutes: 5 }, onExpiry);
  const [timerEnabled, setTimerEnabled] = useState(true);

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

      if ( timerEnabled ) {
        timer.start();
      }

    } else {
      metronome.stop();
      timer.stop();
      timer.reset();
    }
  }, [running]);

  useEffect( () => {
    if (muted) {
      metronome.mute();
      if ( !firstMutedEffect.current )
        showNotification({ title: "Metronome muted!!" });
    } else {
      metronome.unmute();
      if ( !firstMutedEffect.current )
        showNotification({ title: "Metronome unmuted!!" });
    }

    firstMutedEffect.current = false;
  }, [muted] )

  return (
    <MainContainer>
      <Affix position={{ top: 32, right: 32 }} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <UserButton />
        <SettingsButton onClick={() => setSettingsOpened(true)} />
        <CopyButton bpm={metronome.bpm} />
        <ButtonMuteMetronome muted={muted} setMuted={setMuted}/>
      </Affix>
      <MainContent
        bpm={metronome.bpm}
        setBpm={metronome.setBpm}
        toggle={toggle}
        beats={metronome.beats}
        beat={metronome.beat}
        timer={timer}
        running={running}
        muted={muted}
        setMuted={setMuted}
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
        muted={muted}
        setMuted={setMuted}
        timerEnabled={timerEnabled}
        setTimerEnabled={setTimerEnabled}
      />
      <PasswordsEditModal
        resetPasswordToken={resetPasswordToken}
      />
    </MainContainer>
  );
};

export default App;
