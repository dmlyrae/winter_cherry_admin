import { useCallback, useMemo, useState } from "react";
export const useIterator = (
  items,
  initialValue = 0,
  limit = 20,
  filter = "",
  sort = "",
  lastActionId,
  reverse
) => {
  const [i, setIndex] = useState(initialValue);
  const prevFn = useCallback(() => {
    items.prevPage(limit);
    setIndex(items.page);
  }, [limit, items]);
  const nextFn = useCallback(() => {
    items.nextPage(limit);
    setIndex(items.page);
  }, [limit, items]);
  const goToPageFn = useCallback(() => {
    items.getPage(i, limit);
  }, [i, limit, items]);
  const currentItems = useMemo(() => {
    return items.getPage(i, limit);
  }, [i, limit, filter, sort, items, lastActionId, reverse]);
  const numberOfScreens = useMemo(() => {
    // console.log("new invoke for numberOfScreens", lastActionId);
    const ids = items.ids;
    const divine = ids.length / limit;
    const res = Math.ceil(divine);
    return res;
  }, [limit, items, filter, sort, lastActionId]);
  return [
    currentItems,
    prevFn,
    nextFn,
    goToPageFn,
    numberOfScreens,
    setIndex,
    i,
  ];
};
