import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { List, Loader, Title } from "@mantine/core";
import { indexTimeEntries } from "../../apis/timeEntries";

import TimeEntriesGroup from "./TimeEntriesGroup";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

import groupTimeEntriesByDay from "../../utilities/groupTimeEntriesByDay";

const TimeEntries = () => {
  const { isLoading, isError, data, error } = useQuery(
    "timeEntries",
    indexTimeEntries
  );

  useEffect(() => {}, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return error;
  }

  const groupedData = groupTimeEntriesByDay(data);
  const items = [];

  for (const group in groupedData) {
    items.push(<TimeEntriesGroup key={group} title={group} entries={groupedData[group]} />);
  }

  return (
    <>
      {items}
    </>
  );
};

export default TimeEntries;
