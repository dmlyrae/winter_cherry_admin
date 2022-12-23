import iteratorCreator from "./Iterator.js";
const defaultState = {
  loading: true,
  locations: new iteratorCreator(),
  error: null,
};

defaultState.locations.vocabulary = [].concat.call(
  defaultState.locations.vocabulary,
  [["name", "по названию"]]
);
const validator = (location) => {
  if (!location.name) return false;
  return true;
};
export { defaultState, validator };
export const locationsActions = {
  start: "LOCATIONS_START",
  fetch: "FETCH_LOCATIONS",
  success: "LOCATIONS_SUCCESS",
  error: "LOCATIONS_ERROR",
  update: "UPDATE_LOCATION",
  remove: "REMOVE_LOCATION",
};
