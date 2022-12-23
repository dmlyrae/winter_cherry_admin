export const defaultState = {
  currentPageNumber: 0,
  allPages: [
    ["/", "главная"],
    ["sportsmen/", "спортсмены"],
    ["requests/", "заявки"],
    ["locations/", "локации"],
    ["contests/", "дистанции"],
    ["timer/", "таймер"],
  ],
};

export const pageActions = {
  setPage: "SET_PAGE",
  setError: "SET_ERROR_PAGE",
};
