import { useMemo } from "react";

const useSortedCards = (cards, sort, reverse) => {
  // console.log("sort", sort);
  const sortedCards = useMemo(() => {
    const vocabulary = {
      sortByName: "name",
      sortByBirthday: "birthday",
      sortById: "id",
    };
    if (sort) {
      if (sort in vocabulary)
        return [...cards].sort(
          (a, b) =>
            reverse * (a[vocabulary[sort]] < b[vocabulary[sort]] ? -1 : 1)
        );
      return [...cards].sort((a, b) => +a["id"] - +b["id"]);
    }
    return cards;
  }, [sort, cards, reverse]);
  return sortedCards;
};

export const useSort = (sort, query, items) => {
  const sortedAndSearchedCards = useMemo(() => {
    if (items.vocabulary.some((i) => i[0] === sort)) {
      items.sortBy = sort;
    }
    items.filter = query;
    console.log("sort work with", sort, query);
    const result = items.getPage();
    console.log("result = ", result);
    return result;
  }, [query, sort, items.page]);
  return sortedAndSearchedCards;
};
