import React, { useContext, useState } from "react";
import { Checkbox, Modal, NumberInput, Stack } from "@mantine/core";
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
      title="Settings"
      opened={opened}
      onClose={() => setOpened(false)}
      zIndex="100"
    >
      <Stack style={{ marginBottom: 32 }} >
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
      <Stack>
        <TimeInput
          withSeconds
          label="Pomodoro Timer"
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
        <Checkbox
          label="Enable Pomodoro Timer"
          checked={settingsPomodoro.enabled}
          onChange={handlePomodoroEnabled}
        />
      </Stack>
    </Modal>
  );
};

export default ModalSettings;
