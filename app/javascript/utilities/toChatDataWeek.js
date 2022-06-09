import dayjs from "dayjs";

function toChartDataWeek(items) {
  const groupedItems = [0, 0 ,0, 0, 0, 0, 0];

  for (const element of items) {
    groupedItems[dayjs(element.started_at).day()]++;
  }

  return groupedItems;
}

export default toChartDataWeek;
