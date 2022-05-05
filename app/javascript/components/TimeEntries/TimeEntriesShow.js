import React from "react";
import { useQuery } from "react-query";
import { Card,Group, Loader, Space, Stack, Text } from "@mantine/core";
import { showTimeEntry } from "../../apis/timeEntries";

const TimeEntriesShow = ({ id }) => {
  const { isLoading, isError, data, error } = useQuery(
    ["timeEntries", id],
    () => showTimeEntry({ id })
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return JSON.stringify(error);
  }

  return (
    <Stack>
      <Group position="apart">
        <Text weight={700} size="sm">Started at:</Text>
        <Text size="sm">{data.started_at && new Date(data.started_at).toLocaleString()} </Text>
      </Group>
      <Group position="apart">
        <Text weight={700} size="sm">Ended at:</Text>
        <Text size="sm">{data.ended_at && new Date(data.ended_at).toLocaleString()} </Text>
      </Group>
      <Stack spacing="xs">
        <Text weight={700} size="sm">Description:</Text>
        <Text size="sm">{data.description} </Text>
      </Stack>
    </Stack>
  );
};

export default TimeEntriesShow;
