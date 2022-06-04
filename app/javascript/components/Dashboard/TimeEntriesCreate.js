import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  ActionIcon,
  Button,
  Group,
  Loader,
  LoadingOverlay,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { DatePicker, TimeInput } from "@mantine/dates";
import { IconLetterCase, IconPlus } from "@tabler/icons";
import { createTimeEntry } from "../../apis/timeEntries";

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
      form.setFieldValue("description", "");
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
    >
      <fieldset
        style={{ border: "none" }}
        disabled={createTimeEntryMutation.isLoading}
      >
        <Group>
          <TextInput
            icon={<IconLetterCase size="18px" />}
            placeholder="Description"
            sx={(theme) => ({
              flexGrow: 1,
            })}
            {...form.getInputProps("description")}
          />
          <Group
            sx={(theme) => ({
              gap: 4,
            })}
          >
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
                required
                sx={(theme) => ({
                  width: "4rem",
                  input: { textAlign: "center" },
                })}
              />
              <TimeInput
                value={startedAtTime}
                onChange={setStartedAtTime}
                clearable={false}
                sx={(theme) => ({
                  width: "5rem",
                  input: { textAlign: "center" },
                })}
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
                sx={(theme) => ({
                  width: "4rem",
                  input: { textAlign: "center" },
                })}
                required
              />
              <TimeInput
                value={endedAtTime}
                onChange={setEndedAtTime}
                clearable={false}
                sx={(theme) => ({
                  width: "5rem",
                  input: { textAlign: "center" },
                })}
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
      </fieldset>
    </form>
  );
};

export default TimeEntriesCreate;
