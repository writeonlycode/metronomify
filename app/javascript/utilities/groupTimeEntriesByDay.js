import dayjs from "dayjs";

function groupTimeEntriesByDay(items) {
  const groupedItems = {};

  for (const item of items) {
    const startedAt = dayjs(item.started_at).format("YYYY-MM-DD");

    const array = groupedItems[startedAt] || []
    array.push(item)

    groupedItems[startedAt] = array;
  }

  return groupedItems;
}

export default groupTimeEntriesByDay;
