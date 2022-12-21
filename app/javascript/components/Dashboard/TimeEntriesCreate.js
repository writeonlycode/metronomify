import React, { useEffect, useState } from "react";

import { ActionIcon, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

import { IconPlus } from "@tabler/icons";

import DateTimeRange from "./DateTimeRange";

import { useMutation, useQueryClient } from "react-query";
import { createTimeEntry } from "../../apis/timeEntries";

import dayjs from "dayjs";

const TimeEntriesCreate = () => {
  const now = dayjs();
  const [dateRange, setDateRange] = useState([
    now.toDate(),
    now.add(5, "m").toDate(),
  ]);

  useEffect(() => {
    form.setFieldValue("started_at", dateRange[0].toISOString());
    form.setFieldValue("ended_at", dateRange[1].toISOString());
  }, [dateRange]);

  const queryClient = useQueryClient();

  const createTimeEntryMutation = useMutation(createTimeEntry, {
    onSettled: () => {
      queryClient.invalidateQueries(["timeEntries"]);
    },

    onSuccess: () => {
      form.setFieldValue("description", "");
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
      <Group style={{ gap: 1 }}>
        <TextInput
          placeholder="Description"
          style={{ flexGrow: 10 }}
          disabled={createTimeEntryMutation.isLoading}
          variant="filled"
          {...form.getInputProps("description")}
        />
        <DateTimeRange
          value={dateRange}
          onChange={setDateRange}
          disabled={createTimeEntryMutation.isLoading}
          variant="filled"
        />
        <ActionIcon
          variant="filled"
          radius="xl"
          size="lg"
          type="submit"
          color="primary"
          loading={createTimeEntryMutation.isLoading}
          sx={(theme) => ({
            width: "100%",

            [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
              width: "initial",
            },
          })}
        >
          <IconPlus size="16" />
        </ActionIcon>
      </Group>
    </form>
  );
};

export default TimeEntriesCreate;
