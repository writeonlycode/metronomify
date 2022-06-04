import React from "react";
import { useQuery } from "react-query";
import { Alert, Center, Group, Loader, Stack, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { showTimeEntry } from "../../apis/timeEntries";

const TimeEntriesShow = ({ id }) => {
  const { isLoading, isLoadingError, data } = useQuery(
    ["timeEntries", id],
    () => showTimeEntry({ id })
  );

  if (isLoading) {
    return (
      <Center style={{ padding: "2rem 0" }}>
        <Loader color="gray" />
      </Center>
    );
  }

  if (isLoadingError) {
    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="Ops, something went wrong!"
        color="red"
      >
        We coudn't fetch your data. Please, verify your network connection and
        try again.
      </Alert>
    );
  }

  return (
    <Stack>
      <Group position="apart">
        <Text weight={700} size="sm">
          Started at:
        </Text>
        <Text size="sm">
          {data.started_at && new Date(data.started_at).toLocaleString()}{" "}
        </Text>
      </Group>
      <Group position="apart">
        <Text weight={700} size="sm">
          Ended at:
        </Text>
        <Text size="sm">
          {data.ended_at && new Date(data.ended_at).toLocaleString()}{" "}
        </Text>
      </Group>
      <Stack spacing="xs">
        <Text weight={700} size="sm">
          Description:
        </Text>
        <Text size="sm">{data.description} </Text>
      </Stack>
    </Stack>
  );
};

export default TimeEntriesShow;
