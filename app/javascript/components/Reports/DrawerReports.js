import React, { useEffect, useState } from "react";

import { useQuery } from "react-query";
import { indexTimeEntries } from "../../apis/timeEntries";

import { Drawer, Group, Select, Title, useMantineTheme, } from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";

import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, } from "chart.js";
import { Bar } from "react-chartjs-2";

import buildChartLabels from "../../utilities/buildChatLabels";
import buildChartData from "../../utilities/buildChatData";

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
      dayjs(dateRange?.at(0)).isSame( dayjs(predefindedDataRanges.thisWeek[0]), "d") &&
      dayjs(dateRange?.at(1)).isSame( dayjs(predefindedDataRanges.thisWeek[1]), "d")
    ) {
      setSelectDateRange("thisWeek");
    } else if (
      dayjs(dateRange?.at(0)).isSame( dayjs(predefindedDataRanges.thisMonth[0]), "d") &&
      dayjs(dateRange?.at(1)).isSame( dayjs(predefindedDataRanges.thisMonth[1]), "d")
    ) {
      setSelectDateRange("thisMonth");
    } else {
      setSelectDateRange(null);
    }
  }, [dateRange]);

  useEffect(() => {
    selectDateRange && setDateRange(predefindedDataRanges[selectDateRange]);
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
          styles={{
            wrapper: { width: "16rem" },
            input: { textAlign: "center" },
          }}
        />
        <Select
          value={selectDateRange}
          onChange={setSelectDateRange}
          data={[
            { value: "today", label: "Today" },
            { value: "thisWeek", label: "This week" },
            { value: "thisMonth", label: "This month" },
          ]}
        />
      </Group>
      <div style={{ height: "50vh" }}>
        <Bar options={options} data={graphData} />
      </div>
    </Drawer>
  );
};

export default DrawerReports;
