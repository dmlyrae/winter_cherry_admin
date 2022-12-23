const defaultState = {
  loading: true,
  contests: {},
  error: null,
};

const validator = () => {
  return true;
};
export { defaultState, validator };
export const contestsActions = {
  start: "CONTESTS_START",
  fetch: "FETCH_CONTESTS",
  success: "CONTESTS_SUCCESS",
  error: "CONTESTS_ERROR",
  update: "UPDATE_CONTEST",
  remove: "REMOVE_CONTEST",
  fetchContests: "",
};
