import React, { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "react-query";
import { createTimeEntry } from "../../apis/timeEntries";

import { ActionIcon, Group, MediaQuery, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";

import { IconPlus } from "@tabler/icons";
import DateTimeRange from "./DateTimeRange";

import dayjs from "dayjs";

const TimeEntriesCreate = () => {
  const now = dayjs();
  const then = now.add(5, "m");

  const [dateRange, setDateRange] = useState([now.toDate(), then.toDate()]);

  useEffect(() => {
    form.setFieldValue("started_at", dateRange[0].toISOString());
    form.setFieldValue("ended_at", dateRange[1].toISOString());
  }, [dateRange]);

  const queryClient = useQueryClient();

  const createTimeEntryMutation = useMutation(createTimeEntry, {
    onSettled: () => {
      queryClient.invalidateQueries(["timeEntries"]);
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
      <Group style={{ gap: 0 }}>
        <TextInput
          placeholder="Description"
          style={{ flexGrow: 10 }}
          disabled={createTimeEntryMutation.isLoading}
          {...form.getInputProps("description")}
        />
        <MediaQuery smallerThan="sm" styles={{ width: "100%" }}>
          <DateTimeRange
            value={dateRange}
            onChange={setDateRange}
            disabled={createTimeEntryMutation.isLoading}
          />
        </MediaQuery>
        <MediaQuery smallerThan="sm" styles={{ width: "100%" }}>
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
        </MediaQuery>
      </Group>
    </form>
  );
};

export default TimeEntriesCreate;
