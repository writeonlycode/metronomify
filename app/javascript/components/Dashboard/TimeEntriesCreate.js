import React, { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "react-query";
import { createTimeEntry } from "../../apis/timeEntries";

import { ActionIcon, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { DatePicker, TimeInput } from "@mantine/dates";

import { IconLetterCase, IconPlus } from "@tabler/icons";

const TimeEntriesCreate = ({ id }) => {
  const [startedAtDate, setStartedAtDate] = useState(new Date());
  const [endedAtDate, setEndedAtDate] = useState(new Date());
  const [startedAtTime, setStartedAtTime] = useState(new Date());
  const [endedAtTime, setEndedAtTime] = useState(new Date());

  useEffect(() => {
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
      queryClient.invalidateQueries(["timeEntries", id]);
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
      started_at: "",
      ended_at: "",
      lasted_for: "",
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
