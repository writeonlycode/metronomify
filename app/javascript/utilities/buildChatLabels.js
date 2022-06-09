import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

function buildChartLabels(dateRange) {
  const initial = dayjs(dateRange[0]);
  const final = dayjs(dateRange[1]);

  const labels = [];

  for ( let i = 0; initial.add(i, 'd').isSameOrBefore(final); i++ ) {
    const current = initial.add(i, 'd');
    labels[i] = [current.format('MM/D'), current.format('ddd')];
  }

  return labels;
}

export default buildChartLabels;
