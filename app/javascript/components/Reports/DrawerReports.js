import React, { useEffect, useState } from "react";
import { Drawer, LoadingOverlay, Title, useMantineTheme } from "@mantine/core";

import { useQuery } from "react-query";
import { indexTimeEntries } from "../../apis/timeEntries";

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

import dayjs from "dayjs";

import ReportsFilters from "./ReportsFilters/ReportsFilters";

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
      <ReportsFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        selectDateRange={selectDateRange}
        setSelectDateRange={setSelectDateRange}
      />
      <div style={{ position: "relative", height: "50vh" }}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} zIndex={200} />
        <Bar options={options} data={graphData} />
      </div>
    </Drawer>
  );
};

export default DrawerReports;
