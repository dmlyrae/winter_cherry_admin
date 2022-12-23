import iteratorCreator from "./Iterator.js";
const defaultState = {
  loading: true,
  requests: new iteratorCreator(),
  error: null,
};

defaultState.requests.vocabulary = [].concat.call(
  defaultState.requests.vocabulary,
  [
    ["name", "по названию"],
    ["command-address", "по локации"],
    ["year", "по году"],
    ["command-fio", "по представителю"],
  ]
);
const validator = (request) => {
  if (!request.year) return false;
  if (!request.phone) return false;
  return true;
};

export { defaultState, validator };
export const requestsActions = {
  start: "REQUESTS_START",
  fetch: "FETCH_REQUESTS",
  success: "REQUESTS_SUCCESS",
  error: "REQUESTS_ERROR",
  update: "UPDATE_REQUEST",
  remove: "REMOVE_REQUEST",
};
