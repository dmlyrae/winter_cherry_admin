import { defaultState, pageActions } from "../vars/page";

export const pageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case pageActions.setPage:
      return { ...state, currentPageNumber: +action.payload };
    case pageActions.setError:
      return { ...state, currentPageNumber: +action.payload };
    default:
      return { ...state, currentPageNumber: 0 };
  }
};
