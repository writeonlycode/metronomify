import dayjs from "dayjs";

function toChartDataMonth(items, daysInMonth) {
  const groupedItems = [];

  for (let i = 0; i < daysInMonth; i++) {
    groupedItems.push(0);
  }

  for (const element of items) {
    groupedItems[dayjs(element.started_at).date() - 1]++;
  }

  return groupedItems;
}

export default toChartDataMonth;
