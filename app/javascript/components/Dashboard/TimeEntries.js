import React from "react";
import { useQuery } from "react-query";
import { Alert, Center, Loader } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";

import TimeEntriesGroup from "./TimeEntriesGroup";
import { indexTimeEntries } from "../../apis/timeEntries";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

import groupTimeEntriesByDay from "../../utilities/groupTimeEntriesByDay";

const TimeEntries = () => {
  const { isLoading, isLoadingError, data, error } = useQuery(
    "timeEntries",
    indexTimeEntries
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
        We coudn't fetch your data. Please, verify your network
        connection and try again.
      </Alert>
    );
  }

  const groupedData = groupTimeEntriesByDay(data);
  const items = [];

  for (const group in groupedData) {
    items.push(
      <TimeEntriesGroup
        key={group}
        title={group}
        entries={groupedData[group]}
      />
    );
  }

  return <>{items}</>;
};

export default TimeEntries;
