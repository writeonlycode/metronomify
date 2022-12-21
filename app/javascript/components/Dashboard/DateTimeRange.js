import React, { useEffect, useState } from "react";
import { DatePicker, TimeRangeInput } from "@mantine/dates";
import { Group } from "@mantine/core";

const DateTimeRange = ({ value, onChange }, props) => {
  const [startDate, setStartDate] = useState(value[0]);
  let endDate = value[1];

  const [startTime, setStartTime] = useState(value[0]);
  const [endTime, setEndTime] = useState(value[1]);

  useEffect(() => {
    if (dayjs(startTime).isAfter(endTime, "second")) {
      endDate = dayjs(startDate).add(1, "d").toDate();
    } else {
      endDate = startDate;
    }

    const startDateTime = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      startTime.getHours(),
      startTime.getMinutes(),
      startTime.getSeconds()
    );

    const endDateTime = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      endTime.getHours(),
      endTime.getMinutes(),
      endTime.getSeconds()
    );

    onChange([startDateTime, endDateTime]);
  }, [startDate, startTime, endTime]);

  return (
    <Group
      position="apart"
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[5],
        borderRadius: "8px",
        gap: 1,
        width: "100%",

        [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
          width: "initial",
        },
      })}
      {...props}
    >
      <DatePicker
        value={startDate}
        onChange={setStartDate}
        inputFormat="MM/DD"
        labelFormat="MM/DD"
        clearable={false}
        styles={{ input: { width: "4rem", textAlign: "center" } }}
        variant="filled"
        required
      />
      <TimeRangeInput
        value={[startTime, endTime]}
        onChange={(value) => {
          setStartTime(value[0]);
          setEndTime(value[1]);
        }}
        clearable={false}
        styles={{ separator: { padding: 0 }, input: { textAlign: "center" } }}
        variant="filled"
        required
      />
    </Group>
  );
};

export default DateTimeRange;
