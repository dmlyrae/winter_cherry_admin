import { defaultState, eventsActions } from "../vars/events";

export const eventsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case eventsActions.start:
      return { ...state, loading: true };

    case eventsActions.success:
      return { ...state, loading: false };

    case eventsActions.fetch:
      return { ...state, events: state.events.devour(action.payload) };

    case eventsActions.error:
      return { ...state, error: action.payload };

    case eventsActions.update:
      return { ...state, events: state.events.devour(action.payload) };

    case eventsActions.remove:
      return { ...state, events: state.events.remove(action.payload) };
    default:
      return state;
  }
};
