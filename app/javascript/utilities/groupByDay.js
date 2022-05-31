function groupTimeEntriesByDay(items) {
  return items.reduce((acc, curr) => {
    if (curr.started_at) {
      const { started_at } = curr;
      const currentItems = acc[started_at];
  
      return { 
        ...acc,
        [started_at]: currentItems ? [...currentItems, curr] : [curr]
      };
    }
    return acc;
  }, {});
}
