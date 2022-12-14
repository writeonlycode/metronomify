import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button, Group, Space, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { DatePicker, TimeInput } from "@mantine/dates";
import { IconCalendar, IconClock, IconLetterCase } from "@tabler/icons";
import { createTimeEntry } from "../../apis/timeEntries";

const TimeEntriesCreate = () => {
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
    },
    onSuccess: () => {
      showNotification({
        title: "The time entry has been created successfully.",
      });
    },
    onError: () => {
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
      styles={{ display: "block" }}
    >
      <TextInput
        disabled={createTimeEntryMutation.isLoading}
        icon={<IconLetterCase size="18px" />}
        placeholder="Description"
        {...form.getInputProps("description")}
      />
      <Space h="md" />
      <Group grow>
        <Stack>
          <DatePicker
            label="Started At"
            icon={<IconCalendar size="18px" />}
            value={startedAtDate}
            onChange={setStartedAtDate}
            required
          />
          <TimeInput
            icon={<IconClock size="18px" />}
            value={startedAtTime}
            onChange={setStartedAtTime}
            required
          />
        </Stack>
        <Stack>
          <DatePicker
            label="Ended At"
            icon={<IconCalendar size="18px" />}
            value={endedAtDate}
            onChange={setEndedAtDate}
            required
          />
          <TimeInput
            icon={<IconClock size="18px" />}
            value={endedAtTime}
            onChange={setEndedAtTime}
            required
          />
        </Stack>
      </Group>
      <Space h="xl" />
      <Button
        loading={createTimeEntryMutation.isLoading}
        fullWidth
        type="submit"
      >
        Create Time Entry
      </Button>
    </form>
  );
};

export default TimeEntriesCreate;
