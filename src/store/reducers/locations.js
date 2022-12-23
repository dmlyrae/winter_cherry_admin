import { defaultState, locationsActions } from "../vars/locations";

export const locationsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case locationsActions.start:
      return { ...state, loading: true };

    case locationsActions.success:
      return { ...state, loading: false };

    case locationsActions.fetch:
      return { ...state, locations: state.locations.devour(action.payload) };

    case locationsActions.error:
      return { ...state, error: action.payload };

    case locationsActions.update:
      return { ...state, locations: state.locations.devour(action.payload) };

    case locationsActions.remove:
      return { ...state, locations: state.locations.remove(action.payload) };
    default:
      return state;
  }
};
