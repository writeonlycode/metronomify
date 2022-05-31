import React, { useContext, useState } from "react";
import {
  Text,
  Checkbox,
  Modal,
  NumberInput,
  Stack,
  Title,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

import {
  SettingsMetronomeContext,
  SettingsPomodoroContext,
} from "../Providers";

const ModalSettings = ({ opened, setOpened }) => {
  const [settingsMetronome, setSettingsMetronome] = useContext(
    SettingsMetronomeContext
  );
  const [settingsPomodoro, setSettingsPomodoro] = useContext(
    SettingsPomodoroContext
  );

  const handleMetronomeEmphasis = (event) => {
    const emphasis = event.currentTarget.checked;
    setSettingsMetronome((oldValue) => ({ ...oldValue, emphasis }));
  };

  const handlePomodoroEnabled = (event) => {
    const enabled = event.currentTarget.checked;
    setSettingsPomodoro((oldValue) => ({ ...oldValue, enabled }));
  };

  return (
    <Modal
      title={<Title>Settings</Title>}
      opened={opened}
      onClose={() => setOpened(false)}
      zIndex="100"
    >
      <Stack style={{ marginBottom: 32 }}>
        <NumberInput
          label="Beats/Bar"
          value={settingsMetronome.beats}
          onChange={(value) =>
            setSettingsMetronome((oldValue) => ({ ...oldValue, beats: value }))
          }
        />
        <Checkbox
          label="Emphasis on first beat"
          checked={settingsMetronome.emphasis}
          onChange={handleMetronomeEmphasis}
        />
      </Stack>
      <Stack
        sx={(theme) => ({
          padding: "16px",
          backgroundColor: theme.colors.dark[9],
          borderRadius: "8px",
        })}
      >
        <Text weight={700}>Pomodoro Mode</Text>
        <Text size="sm">
          The Pomodoro Technique is a time management method developed by
          Francesco Cirillo in the late 1980s. It uses a timer to break work
          into intervals, separated by short breaks.
        </Text>
        <Text size="sm">
          If pomodoro mode is enabled, the metronome will start with a pomodoro
          timer, and when the timer expires, a time entry will atomatically be
          added to your dashboard.
        </Text>
        <Checkbox
          label="Enable"
          checked={settingsPomodoro.enabled}
          onChange={handlePomodoroEnabled}
        />
        <TimeInput
          withSeconds
          label="Pomodoro timer interval"
          value={
            new Date(
              0,
              0,
              0,
              settingsPomodoro.duration.hours(),
              settingsPomodoro.duration.minutes(),
              settingsPomodoro.duration.seconds()
            )
          }
          onChange={(value) =>
            setSettingsPomodoro((oldValue) => ({
              ...oldValue,
              duration: dayjs.duration({
                hours: value.getHours(),
                minutes: value.getMinutes(),
                seconds: value.getSeconds(),
              }),
            }))
          }
        />
      </Stack>
    </Modal>
  );
};

export default ModalSettings;
