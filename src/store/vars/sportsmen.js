import iteratorCreator from "./Iterator.js";
const defaultState = {
  loading: true,
  sportsmen: new iteratorCreator(),
  error: null,
};

defaultState.sportsmen.vocabulary = [].concat.call(
  defaultState.sportsmen.vocabulary,
  [
    ["name", "по имени"],
    ["birthday", "по возрасту"],
    ["gender", "по полу"],
  ]
);
const validator = (sportsman) => {
  if (!sportsman.birthday) return false;
  if (!sportsman.rank_sp) return false;
  return true;
};
export { defaultState, validator };

export const sportsmenActions = {
  start: "SPORTSMEN_START",
  fetch: "FETCH_SPORTSMEN",
  success: "SPORTSMEN_SUCCESS",
  error: "SPORTSMEN_ERROR",
  update: "UPDATE_SPORTSMAN",
  remove: "REMOVE_SPORTSMAN",
};
