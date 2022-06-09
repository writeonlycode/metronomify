import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

function buildChartData(data, dateRange) {

  const initial = dayjs(dateRange[0]);
  const final = dayjs(dateRange[1]);

  const difference = final.diff(initial, 'd');
  const chartData = new Array(difference).fill(0)

  for (const element of data) {
    const current = dayjs(element.started_at);
    chartData[current.diff(initial, 'd')]++;
  }

  return chartData;
}

export default buildChartData;
