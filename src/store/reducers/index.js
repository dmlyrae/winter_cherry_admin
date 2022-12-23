import { authReducer } from "./auth";
import { sportsmenReducer } from "./sportsmen";
import { locationsReducer } from "./locations";
import { requestsReducer } from "./requests";
import { pageReducer } from "./page";
import { contestsReducer } from "./contests";
import { combineReducers } from "redux";
import { eventsReducer } from "./events";

export const rootReducer = combineReducers({
  auth: authReducer,
  sportsmen: sportsmenReducer,
  requests: requestsReducer,
  locations: locationsReducer,
  page: pageReducer,
  contests: contestsReducer,
  events: eventsReducer,
});
