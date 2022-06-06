import React, { useState } from "react";

import { useQuery } from "react-query";
import { indexTimeEntries } from "../../apis/timeEntries";

import { Alert, Button, Center, Loader, Stack, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";

import TimeEntriesGroup from "./TimeEntriesGroup";

import groupTimeEntriesByDay from "../../utilities/groupTimeEntriesByDay";

import dayjs from "dayjs";

const TimeEntries = () => {
  const now = dayjs();
  now.set("h", 0).set("m", 0).set("s", 0).set("ms", 0);

  const [dateRange, setDateRange] = useState([
    now.subtract(7, "d"),
    now.clone(),
  ]);

  const { isLoading, isLoadingError, isFetching, data } = useQuery(
    ["timeEntries", dateRange],
    (queryContext) =>
      indexTimeEntries(
        queryContext.queryKey.at(1).at(0).toISOString(),
        queryContext.queryKey.at(1).at(1).toISOString()
      ),
    { keepPreviousData: true }
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

  return (
    <>
      {items}
      <Center>
        <Stack>
          <Text size="sm">
            Showing entries since {dateRange[0].toString()}.
          </Text>
          <Button
            loading={isFetching}
            onClick={() =>
              setDateRange((value) => [value[0].subtract(7, "d"), value[1]])
            }
          >
            Load More
          </Button>
        </Stack>
      </Center>
    </>
  );
};

export default TimeEntries;
