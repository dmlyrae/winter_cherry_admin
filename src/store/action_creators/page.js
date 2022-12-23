import { pageActions } from "../vars/page";

export const setPage = (p) => {
  return async (dispatch) => {
    try {
      // Некие ассинхронные действия
      // Пытается что-то сделать
      dispatch({
        type: pageActions.setPage,
        payload: p,
      });
    } catch (e) {
      dispatch({
        type: pageActions.setError,
        payload: 5,
      });
    }
  };
};
