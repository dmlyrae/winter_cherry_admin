import { defaultState, requestsActions } from "../vars/requests";

export const requestsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case requestsActions.start:
      return { ...state, loading: true };

    case requestsActions.success:
      return { ...state, loading: false };

    case requestsActions.fetch:
      return { ...state, requests: state.requests.devour(action.payload) };

    case requestsActions.error:
      return { ...state, error: action.payload };

    case requestsActions.update:
      return { ...state, requests: state.requests.devour(action.payload) };

    case requestsActions.remove:
      return { ...state, requests: state.requests.remove(action.payload) };
    default:
      return state;
  }
};
