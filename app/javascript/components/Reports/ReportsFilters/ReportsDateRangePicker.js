import React from "react";
import { DateRangePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons";

const dateRangePickerStyles = (theme) => ({
  root: {
    width: "100%",
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      width: "24rem",
    },
  },
  input: { textAlign: "center" },
  dropdown: {
    zIndex: 500,
  }
});

const ReportsDateRangePicker = ({ dateRange, setDateRange }) => {
  return (
    <DateRangePicker
      value={dateRange}
      onChange={setDateRange}
      firstDayOfWeek="sunday"
      amountOfMonths={1}
      clearable={false}
      icon={<IconCalendar size={16} />}
      styles={dateRangePickerStyles}
    />
  );
};

export default ReportsDateRangePicker;
