import React from "react";

import { Button, Flex, Group, Select } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import ReportsDateRangePicker from "./ReportsDateRangePicker";

const ReportsFilters = ({
  dateRange,
  setDateRange,
  selectDateRange,
  setSelectDateRange,
}) => {
  const goToDateRange = (value) => {
    const start = dayjs(dateRange[0]);
    const end = dayjs(dateRange[1]);
    const duration = end.diff(start, "days");

    if (start.isSame(end, "day")) {
      // if duration is 1 day, then go to previous/next day
      if (value === "previous") {
        setDateRange([
          start.subtract(1, "day").toDate(),
          start.subtract(1, "day").toDate(),
        ]);
      } else if (value === "next") {
        setDateRange([
          start.add(1, "day").toDate(),
          start.add(1, "day").toDate(),
        ]);
      }
    } else if (
      start.isSame(start.startOf("week"), "day") &&
      end.isSame(start.endOf("week"), "day")
    ) {
      // if duration is 1 week, then go to previous/next week
      if (value === "previous") {
        setDateRange([
          start.subtract(1, "week").toDate(),
          end.subtract(1, "week").toDate(),
        ]);
      } else if (value === "next") {
        setDateRange([
          start.add(1, "week").toDate(),
          end.add(1, "week").toDate(),
        ]);
      }
    } else if (
      start.isSame(start.startOf("month"), "day") &&
      end.isSame(start.endOf("month"), "day")
    ) {
      // if duration is 1 month, then go to previous/next month
      if (value === "previous") {
        setDateRange([
          start
            .month(start.month() - 1)
            .startOf("month")
            .toDate(),
          start
            .month(start.month() - 1)
            .endOf("month")
            .toDate(),
        ]);
      } else if (value === "next") {
        setDateRange([
          start
            .month(start.month() + 1)
            .startOf("month")
            .toDate(),
          start
            .month(start.month() + 1)
            .endOf("month")
            .toDate(),
        ]);
      }
    } else {
      // else, go to previous/next period of the same duration
      if (value === "previous") {
        setDateRange([
          start.subtract(duration, "days").subtract(1, "days").toDate(),
          start.subtract(1, "days").toDate(),
        ]);
      } else if (value === "next") {
        setDateRange([
          end.add(1, "days").toDate(),
          end.add(duration + 1, "days").toDate(),
        ]);
      }
    }
  };

  const goToPrevousDateRange = () => {
    goToDateRange("previous");
  };

  const goToNextDateRange = () => {
    goToDateRange("next");
  };

  return (
    <Group style={{ margin: "2rem 0" }}>
      <ReportsDateRangePicker
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <Flex
        sx={(theme) => ({
          width: "100%",
          [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            width: "initial",
          },
        })}
      >
        <Button variant="default" onClick={goToPrevousDateRange}>
          <IconChevronLeft />
        </Button>
        <Select
          styles={{
            root: {
              flexGrow: 1,
            },
            input: { textAlign: "center" },
            item: { textAlign: "center" },
          }}
          value={selectDateRange}
          onChange={setSelectDateRange}
          data={[
            { value: "today", label: "Today" },
            { value: "thisWeek", label: "This Week" },
            { value: "thisMonth", label: "This Month" },
            { value: "customRange", label: "Custom Range" },
          ]}
        />
        <Button variant="default" onClick={goToNextDateRange}>
          <IconChevronRight />
        </Button>
      </Flex>
    </Group>
  );
};

export default ReportsFilters;
