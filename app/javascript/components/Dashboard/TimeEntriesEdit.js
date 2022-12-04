import React, { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "react-query";
import { updateTimeEntry } from "../../apis/timeEntries";

import { Button, Group, Space, Stack, TextInput } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

import { IconCalendar, IconClock, IconLetterCase } from "@tabler/icons";

const TimeEntriesEdit = (props) => {
  const [description, setDescription] = useState("");
  const [startedAtDate, setStartedAtDate] = useState(new Date());
  const [startedAtTime, setStartedAtTime] = useState(new Date());
  const [endedAtDate, setEndedAtDate] = useState(new Date());
  const [endedAtTime, setEndedAtTime] = useState(new Date());

  useEffect(() => {
    setDescription(props.description);
    setStartedAtDate(new Date(props.started_at));
    setStartedAtTime(new Date(props.started_at));
    setEndedAtDate(new Date(props.ended_at));
    setEndedAtTime(new Date(props.ended_at));
  }, []);

  const queryClient = useQueryClient();

  const updateTimeEntryMutation = useMutation((data) => updateTimeEntry(data), {
    onSettled: () => {
      queryClient.invalidateQueries(["timeEntries"]);
    },
    onSuccess: () => {
      showNotification({
        title: "The time entry has been updated successfully.",
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

  useEffect(() => {
    form.setFieldValue("description", description);
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
  }, [description, startedAtDate, startedAtTime, endedAtDate, endedAtTime]);

  const onSubmitHandler = form.onSubmit((values) => {
    updateTimeEntryMutation.mutate({ id: props.id, ...values });
  });

  return (
    <form onSubmit={onSubmitHandler}>
      <TextInput
        icon={<IconLetterCase size="18px" />}
        placeholder="Description"
        disabled={updateTimeEntryMutation.isLoading}
        {...form.getInputProps("description")}
      />
      <Space h="md" />
      <Group grow>
        <Stack>
          <DatePicker
            icon={<IconCalendar size="18px" />}
            value={startedAtDate}
            onChange={setStartedAtDate}
            disabled={updateTimeEntryMutation.isLoading}
            required
          />
          <TimeInput
            icon={<IconClock size="18px" />}
            value={startedAtTime}
            onChange={setStartedAtTime}
            disabled={updateTimeEntryMutation.isLoading}
            required
          />
        </Stack>
        <Stack>
          <DatePicker
            icon={<IconCalendar size="18px" />}
            value={endedAtDate}
            onChange={setEndedAtDate}
            disabled={updateTimeEntryMutation.isLoading}
            required
          />
          <TimeInput
            icon={<IconClock size="18px" />}
            value={endedAtTime}
            onChange={setEndedAtTime}
            disabled={updateTimeEntryMutation.isLoading}
            required
          />
        </Stack>
      </Group>
      <Space h="xl" />
      <Button
        fullWidth
        type="submit"
        loading={updateTimeEntryMutation.isLoading}
      >
        Update
      </Button>
    </form>
  );
};

export default TimeEntriesEdit;
