import { defaultState, sportsmenActions } from "../vars/sportsmen";

export const sportsmenReducer = (state = defaultState, action) => {
  switch (action.type) {
    case sportsmenActions.start:
      return { ...state, loading: true };

    case sportsmenActions.success:
      return { ...state, loading: false };

    case sportsmenActions.fetch:
      return { ...state, sportsmen: state.sportsmen.devour(action.payload) };

    case sportsmenActions.error:
      return { ...state, error: action.payload };

    case sportsmenActions.update:
      return { ...state, sportsmen: state.sportsmen.devour(action.payload) };

    case sportsmenActions.remove:
      return { ...state, sportsmen: state.sportsmen.remove(action.payload) };
    default:
      return state;
  }
};
