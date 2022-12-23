import { defaultState, contestsActions } from "../vars/contests";

export const contestsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case contestsActions.start:
      return { ...state, loading: true };

    case contestsActions.success:
      return { ...state, loading: false };

    case contestsActions.fetch:
      return { ...state, contests: action.payload };

    case contestsActions.error:
      return { ...state, error: action.payload };

    case contestsActions.update:
      console.log("payload", action.payload);
      return {
        ...state,
        contests: {
          ...state.contests,
          [action.payload.name]: {
            ...state.contests[action.payload.name],
            ...action.payload.contest,
          },
        },
      };

    default:
      return state;
  }
};
