import React, { useEffect, useState } from "react";

import { useQuery } from "react-query";
import { indexTimeEntries } from "../../apis/timeEntries";

import {
  Flex,
  Button,
  Drawer,
  Group,
  LoadingOverlay,
  Select,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import buildChartLabels from "../../utilities/buildChatLabels";
import buildChartData from "../../utilities/buildChatData";
import { IconCalendar, IconChevronLeft, IconChevronRight } from "@tabler/icons";

import dayjs from "dayjs";
// import { useDateRangePickerStyles } from "./DrawerReportsStyles";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

const DrawerReports = ({ opened, setOpened }) => {
  const now = dayjs().set("h", 0).set("m", 0).set("s", 0).set("ms", 0);

  const predefindedDataRanges = {
    today: [now.toDate(), now.toDate()],
    thisWeek: [now.day(0).toDate(), now.day(6).toDate()],
    thisMonth: [now.date(1).toDate(), now.date(now.daysInMonth()).toDate()],
  };

  const [dateRange, setDateRange] = useState(predefindedDataRanges.thisWeek);
  const [selectDateRange, setSelectDateRange] = useState("thisWeek");

  const dateRangePrevious = () => {
    const start = dayjs(dateRange[0]);
    const end = dayjs(dateRange[1]);
    const duration = dayjs(end).diff(start, "days");

    if (start.isSame(end, "day")) {
      // if duration is exactly 1 day, then go to previous day
      console.log("Going to previous day!");
      setDateRange([
        start.subtract(1, "day").toDate(),
        start.subtract(1, "day").toDate(),
      ]);
    } else if (
      start.isSame(start.startOf("week"), "day") &&
      end.isSame(start.endOf("week"), "day")
    ) {
      // if duration is exactly 1 week, then go to previous week
      console.log("Going to previous week!");
      setDateRange([
        start.subtract(1, "week").toDate(),
        end.subtract(1, "week").toDate(),
      ]);
    } else if (
      start.isSame(start.startOf("month"), "day") &&
      end.isSame(start.endOf("month"), "day")
    ) {
      // if duration is exactly 1 month, then go to previous month
      console.log("Going to previous month!");
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
    } else {
      // else, go to previous period of the same duration
      console.log("Going to previous period!");
      setDateRange([
        start.subtract(duration + 1, "days").toDate(),
        start.subtract(1, "days").toDate(),
      ]);
    }
  };

  const dateRangeNext = () => {
    const start = dayjs(dateRange[0]);
    const end = dayjs(dateRange[1]);
    const duration = dayjs(end).diff(start, "days");

    if (start.isSame(end, "day")) {
      // if duration is exactly 1 day, then go to next day
      console.log("Going to next day!");
      setDateRange([
        start.add(1, "day").toDate(),
        start.add(1, "day").toDate(),
      ]);
    } else if (
      start.isSame(start.startOf("week"), "day") &&
      end.isSame(start.endOf("week"), "day")
    ) {
      // if duration is exactly 1 week, then go to next week
      console.log("Going to next week!");
      setDateRange([
        start.add(1, "week").toDate(),
        end.add(1, "week").toDate(),
      ]);
    } else if (
      start.isSame(start.startOf("month"), "day") &&
      end.isSame(start.endOf("month"), "day")
    ) {
      // if duration is exactly 1 month, then go to next month
      console.log("Going to next month!");
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
    } else {
      // else, go to previous period of the same duration
      console.log("Going to next period!");
      setDateRange([
        start.add(duration + 1, "days").toDate(),
        end.add(duration + 1, "days").toDate(),
      ]);
    }
  };

  const { isLoading, isLoadingError, isFetching, data } = useQuery(
    ["timeEntries", dateRange],
    (queryContext) =>
      indexTimeEntries(
        queryContext.queryKey.at(1).at(0).toISOString(),
        queryContext.queryKey.at(1).at(1).toISOString()
      )
  );

  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data) {
      setChartLabels(buildChartLabels(dateRange));
      setChartData(buildChartData(data, dateRange));
    }
  }, [data]);

  useEffect(() => {
    if (
      dayjs(dateRange?.at(0)).isSame(
        dayjs(predefindedDataRanges.today[0]),
        "d"
      ) &&
      dayjs(dateRange?.at(1)).isSame(dayjs(predefindedDataRanges.today[1]), "d")
    ) {
      setSelectDateRange("today");
    } else if (
      dayjs(dateRange?.at(0)).isSame(
        dayjs(predefindedDataRanges.thisWeek[0]),
        "d"
      ) &&
      dayjs(dateRange?.at(1)).isSame(
        dayjs(predefindedDataRanges.thisWeek[1]),
        "d"
      )
    ) {
      setSelectDateRange("thisWeek");
    } else if (
      dayjs(dateRange?.at(0)).isSame(
        dayjs(predefindedDataRanges.thisMonth[0]),
        "d"
      ) &&
      dayjs(dateRange?.at(1)).isSame(
        dayjs(predefindedDataRanges.thisMonth[1]),
        "d"
      )
    ) {
      setSelectDateRange("thisMonth");
    } else {
      setSelectDateRange("customRange");
    }
  }, [dateRange]);

  useEffect(() => {
    if (selectDateRange !== "customRange") {
      selectDateRange && setDateRange(predefindedDataRanges[selectDateRange]);
    }
  }, [selectDateRange]);

  const theme = useMantineTheme();

  const options = {
    maintainAspectRatio: false,
    responsive: true,

    backgroundColor: theme.colors[theme.primaryColor][7],
    borderRadius: { topLeft: 8, topRight: 8 },

    scale: {
      ticks: {
        precision: 0,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          // color: theme.colors.gray[0],
        },
      },
    },
  };

  const graphData = {
    labels: chartLabels,
    datasets: [
      {
        label: "# of Time Entries",
        data: chartData,
      },
    ],
  };

  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title={<Title>Reports</Title>}
      padding="xl"
      size="full"
      position="right"
      transitionDuration={500}
      styles={{ drawer: { overflowY: "scroll" } }}
    >
      <Group style={{ margin: "2rem 0" }}>
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          firstDayOfWeek="sunday"
          amountOfMonths={1}
          clearable={false}
          icon={<IconCalendar size={16} />}
          styles={(theme) => ({
            root: {
              width: "100%",
              [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                width: "26rem",
              },
            },
            input: { textAlign: "center" },
          })}
        />
        <Flex
          styles={(theme) => ({
            root: {
              display: "flex",
              justifyContent: "center",
              width: "100%",
              [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                width: "initial",
              },
            },
          })}
        >
          <Button 
            styles={{
              root: { maxWidth: "2rem" },
            }}
          variant="default" onClick={dateRangePrevious}>
            <IconChevronLeft />
          </Button>
          <Select
            styles={{
              input: { textAlign: "center" },
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
          <Button variant="default" onClick={dateRangeNext}>
            <IconChevronRight />
          </Button>
        </Flex>
      </Group>
      <div style={{ position: "relative", height: "50vh" }}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <Bar options={options} data={graphData} />
      </div>
    </Drawer>
  );
};

export default DrawerReports;
