import React, { useContext, useEffect, useState } from "react";

import { useMutation, useQueryClient } from "react-query";
import { createTimeEntry } from "../apis/timeEntries";

import { Button, Space } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import MenuMain from "./Menu/MenuMain";

import DisplayBpm from "./Display/DisplayBpm";
import DisplayBeats from "./Display/DisplayBeats";

import PasswordsEditModal from "./Users/PasswordsEditModal";

import useCustomHotkeys from "../hooks/useCustomHotkeys";
import useMetronome from "../hooks/useMetronome";
import useTimer from "../hooks/useTimer";

import {
  SettingsApplicationContext,
  SettingsMetronomeContext,
  SettingsPomodoroContext,
} from "./Providers";
import DisplayPomodoro from "./Display/DisplayPomodoro";

import dayjs from "dayjs";
window.dayjs = dayjs

const App = () => {
  const settingsApplication = useContext(SettingsApplicationContext);

  const [settingsMetronome, setSettingsMetronome] = useContext(
    SettingsMetronomeContext
  );
  const [settingsPomodoro, setSettingsPomodoro] = useContext(
    SettingsPomodoroContext
  );

  const [description, setDescription] = useState("");

  useCustomHotkeys(
    settingsApplication,
    setSettingsMetronome,
    setSettingsPomodoro
  );

  // Metronome
  const metronome = useMetronome({
    bpm: settingsMetronome.bpm,
    beats: settingsMetronome.beats,
    emphasis: settingsMetronome.emphasis,
    muted: settingsMetronome.muted,
    running: settingsMetronome.running,
  });

  useEffect(() => {
    if (settingsMetronome.muted) {
      showNotification({ title: "Metronome muted." });
    } else {
      showNotification({ title: "Metronome unmuted." });
    }
  }, [settingsMetronome.muted]);

  // Timer
  const queryClient = useQueryClient();

  const createTimeEntryMutation = useMutation(createTimeEntry, {
    onSettled: () => {
      queryClient.invalidateQueries(["timeEntries"]);
    },
    onSuccess: (data) => {
      setDescription("");
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

  const timer = useTimer(settingsPomodoro.duration.toISOString(), (values) =>
    createTimeEntryMutation.mutate({
      ...values,
      description,
      bpm: settingsMetronome.bpm,
    })
  );

  useEffect(() => {
    timer.setInitial(settingsPomodoro.duration.clone());
  }, [settingsPomodoro.duration]);

  // Metronome and Timer
  const toggleRunning = () =>
    setSettingsMetronome((prevValue) => ({
      ...prevValue,
      running: !prevValue.running,
    }));

  useEffect(() => {
    if (settingsMetronome.running && settingsPomodoro.enabled) {
      timer.start();
    } else {
      timer.stop();
      timer.reset();
    }
  }, [settingsMetronome.running]);

  // Reset Password Token
  const [resetPasswordToken, setResetPasswordToken] = useState(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (params.reset_password_token) {
      setResetPasswordToken(params.reset_password_token);
    }
  }, []);

  return (
    <>
      <MenuMain />
      <DisplayBpm />
      <Space h="2rem" />
      <DisplayBeats total={settingsMetronome.beats} current={metronome.beat} />
      <Space h="6rem" />
      {settingsPomodoro.enabled && (
        <DisplayPomodoro
          timer={timer}
          description={description}
          setDescription={setDescription}
        />
      )}
      <Space h="6rem" />
      <Button fullWidth size="lg" uppercase onClick={() => toggleRunning()}>
        {settingsMetronome.running ? "STOP" : "START"}
      </Button>
      <PasswordsEditModal resetPasswordToken={resetPasswordToken} />
    </>
  );
};

export default App;
