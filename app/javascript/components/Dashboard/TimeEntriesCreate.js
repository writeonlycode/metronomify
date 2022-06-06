import React, { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "react-query";
import { createTimeEntry } from "../../apis/timeEntries";

import { ActionIcon, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { DatePicker, TimeInput } from "@mantine/dates";

import { IconLetterCase, IconPlus } from "@tabler/icons";
import dayjs from "dayjs";

const TimeEntriesCreate = () => {
  const now = dayjs();

  const [startedAtDate, setStartedAtDate] = useState(now.toDate());
  const [startedAtTime, setStartedAtTime] = useState(now.toDate());

  const [endedAtDate, setEndedAtDate] = useState(now.add(5, 'm').toDate());
  const [endedAtTime, setEndedAtTime] = useState(now.add(5, 'm').toDate());

  useEffect(() => {
    console.log(startedAtDate);
    console.log(startedAtTime);
    form.setFieldValue(
      "started_at",
      new Date(
        startedAtDate?.getFullYear(),
        startedAtDate?.getMonth(),
        startedAtDate?.getDate(),
        startedAtTime?.getHours(),
        startedAtTime?.getMinutes(),
        startedAtTime?.getSeconds()
      ).toISOString()
    );
  }, [startedAtDate, startedAtTime]);

  useEffect(() => {
    console.log(endedAtDate);
    console.log(endedAtTime);
    form.setFieldValue(
      "ended_at",
      new Date(
        endedAtDate?.getFullYear(),
        endedAtDate?.getMonth(),
        endedAtDate?.getDate(),
        endedAtTime?.getHours(),
        endedAtTime?.getMinutes(),
        endedAtTime?.getSeconds()
      ).toISOString()
    );
  }, [endedAtTime, endedAtTime]);

  const queryClient = useQueryClient();

  const createTimeEntryMutation = useMutation(createTimeEntry, {
    onSettled: () => {
      queryClient.invalidateQueries(["timeEntries"]);
    },
    onSuccess: (data) => {
      console.log(JSON.parse(JSON.stringify(data)));
      form.setFieldValue("description", "");
      showNotification({
        title: "The time entry has been created successfully.",
      });
    },
    onError: (errors) => {
      console.log(JSON.parse(JSON.stringify(errors)));
      showNotification({
        color: "red",
        title: "Ops, something is wrong...",
      });
    },
  });

  const form = useForm({
    initialValues: {
      description: "",
      bpm: null,
      started_at: null,
      ended_at: null,
      lasted_for: null,
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        createTimeEntryMutation.mutate(values);
      })}
      style={{ display: "block" }}
    >
      <Group>
        <TextInput
          icon={<IconLetterCase size="18px" />}
          placeholder="Description"
          style={{ flexGrow: 1 }}
          disabled={createTimeEntryMutation.isLoading}
          {...form.getInputProps("description")}
        />
        <Group styles={{ gap: 4 }}>
          <NumberInput
            placeholder="bpm"
            style={{ width: "5rem" }}
            {...form.getInputProps("bpm")}
          />
          <Group
            sx={(theme) => ({
              backgroundColor: theme.colors.dark[5],
              borderRadius: "8px",
              gap: 0,
            })}
          >
            <DatePicker
              value={startedAtDate}
              onChange={setStartedAtDate}
              inputFormat="MM/DD"
              labelFormat="MM/DD"
              clearable={false}
              style={{ width: "4rem", input: { textAlign: "center" } }}
              disabled={createTimeEntryMutation.isLoading}
              required
            />
            <TimeInput
              value={startedAtTime}
              onChange={setStartedAtTime}
              clearable={false}
              style={{ width: "5rem", input: { textAlign: "center" } }}
              disabled={createTimeEntryMutation.isLoading}
              required
            />
          </Group>
          <Group
            sx={(theme) => ({
              backgroundColor: theme.colors.dark[5],
              borderRadius: "8px",
              gap: 0,
            })}
          >
            <DatePicker
              value={endedAtDate}
              onChange={setEndedAtDate}
              inputFormat="MM/DD"
              labelFormat="MM/DD"
              clearable={false}
              style={{ width: "4rem", input: { textAlign: "center" } }}
              disabled={createTimeEntryMutation.isLoading}
              required
            />
            <TimeInput
              value={endedAtTime}
              onChange={setEndedAtTime}
              clearable={false}
              style={{ width: "5rem", input: { textAlign: "center" } }}
              disabled={createTimeEntryMutation.isLoading}
              required
            />
          </Group>
        </Group>
        <ActionIcon
          variant="filled"
          radius="xl"
          size="lg"
          type="submit"
          color="primary"
          loading={createTimeEntryMutation.isLoading}
        >
          <IconPlus size="16" />
        </ActionIcon>
      </Group>
    </form>
  );
};

export default TimeEntriesCreate;
