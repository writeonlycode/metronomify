import React, { useEffect, useState } from "react";
import { ActionIcon, Group, Input } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons";
import { Temporal } from "@js-temporal/polyfill";

const TimerInput = ({ label, timer, onChange }) => {
  return (
    <Group position="apart">
      <label style={{ textTransform: "uppercase", fontWeight: "500", fontSize: "14px" }}>
        {label}
      </label>
      <Group spacing={5}>
        <ActionIcon
          size="lg"
          radius="xl"
          variant="filled"
          style={{ flexGrow: 0 }}
          onClick={() => timer.setInitial(timer.initial.subtract({ minutes: 1 }))}
        >
          <IconMinus size="18px" />
        </ActionIcon>

        <Input
          aria-label={label}
          value={
            timer?.initial.minutes.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }) +
            ":" +
            timer?.initial.seconds.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })
          }
          // onChange={(newValue) => setTimer(newValue)}
          styles={{ input: { width: 54, textAlign: "center" } }}
          variant="unstyled"
          onChange={() => {}}
        />

        <ActionIcon
          size="lg"
          radius="xl"
          variant="filled"
          style={{ flexGrow: 0 }}
          onClick={() => timer.setInitial(timer.initial.add({ minutes: 1 }))}
        >
          <IconPlus size="18px" />
        </ActionIcon>
      </Group>
    </Group>
  );
};

export default TimerInput;
