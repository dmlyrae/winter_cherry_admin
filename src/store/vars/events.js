import iteratorCreator from "./Iterator.js";
const defaultState = {
  loading: true,
  events: new iteratorCreator(),
  error: null,
};

defaultState.events.vocabulary = [].concat.call(
  defaultState.events.vocabulary,
  [["time", "по дате"]]
);
const validator = (event) => {
  if (!event.time) return false;
  return true;
};
export { defaultState, validator };
export const eventsActions = {
  start: "EVENTS_START",
  fetch: "FETCH_EVENTS",
  success: "EVENTS_SUCCESS",
  error: "EVENTS_ERROR",
  update: "UPDATE_EVENT",
  remove: "REMOVE_EVENT",
};
