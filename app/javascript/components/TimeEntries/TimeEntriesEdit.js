import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button, Group, LoadingOverlay, Space, Stack, TextInput } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconCalendar, IconClock, IconLetterCase } from "@tabler/icons";
import { updateTimeEntry, showTimeEntry } from "../../apis/timeEntries";

const TimeEntriesEdit = ({ id }) => {
  const [description, setDescription] = useState("");
  const [startedAtDate, setStartedAtDate] = useState(new Date());
  const [startedAtTime, setStartedAtTime] = useState(new Date());
  const [endedAtDate, setEndedAtDate] = useState(new Date());
  const [endedAtTime, setEndedAtTime] = useState(new Date());

  const { isLoading, isError, data, error } = useQuery(
    ["timeEntries", id],
    () => showTimeEntry({ id })
  );

  useEffect(() => {
    data && setDescription(data.description);
    data && setStartedAtDate(new Date(data.started_at));
    data && setStartedAtTime(new Date(data.started_at));
    data && setEndedAtDate(new Date(data.ended_at));
    data && setEndedAtTime(new Date(data.ended_at));
  }, [data]);

  const queryClient = useQueryClient();

  const updateTimeEntryMutation = useMutation(updateTimeEntry, {
    onSettled: () => {
      queryClient.invalidateQueries(["timeEntries"]);
      queryClient.invalidateQueries(["timeEntries", id]);
    },
    onSuccess: (data) => {
      showNotification({
        title: "The time entry has been updated successfully.",
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
    updateTimeEntryMutation.mutate({ id, ...values });
  });

  return (
    <>
      <LoadingOverlay visible={isLoading || updateTimeEntryMutation.isLoading} />
      <form onSubmit={onSubmitHandler}>
        <TextInput
          icon={<IconLetterCase size="18px" />}
          placeholder="Description"
          {...form.getInputProps("description")}
        />
        <Space h="md" />
        <Group grow>
          <Stack>
            <DatePicker
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
          fullWidth
          type="submit"
        >
          Update Time Entry
        </Button>
      </form>
    </>
  );
};

export default TimeEntriesEdit;
