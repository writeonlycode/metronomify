import dayjs from "dayjs";

function groupTimeEntriesByWeekday(items) {
  const groupedItems = {};

  for (const item of items) {
    const startedAt = dayjs(item.started_at).day();

    const array = groupedItems[startedAt] || []
    array.push(item)

    groupedItems[startedAt] = array;
  }

  return groupedItems;
}

export default groupTimeEntriesByWeekday;
