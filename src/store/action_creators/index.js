import * as SportsmenActionCreators from "./sportsmen";
import * as LocationsActionCreators from "./locations";
import * as RequestsActionCreators from "./requests";
import * as AuthActionCreators from "./auth";
import * as PageActionCreators from "./page";
import * as ContestsActionCreators from "./contests";
import * as EventsActionCreators from "./events";

const actions = {
  ...SportsmenActionCreators,
  ...LocationsActionCreators,
  ...RequestsActionCreators,
  ...AuthActionCreators,
  ...PageActionCreators,
  ...ContestsActionCreators,
  ...EventsActionCreators,
};

export default actions;
