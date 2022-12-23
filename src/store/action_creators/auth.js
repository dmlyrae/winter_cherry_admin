import { authActions } from "../vars/auth";

export const authLogin = (login, password) => {
  return (dispatch) => {
    try {
      dispatch({ type: authActions.authTry });
      dispatch({
        type: authActions.authLogin,
        isAuth: true,
        JWT: "some response from http",
        userInfo: { username: "username" },
      });
      dispatch({ type: authActions.authSuccess });
    } catch (e) {
      dispatch({ type: authActions.authError, isAuth: false, JWT: "" });
    }
  };
};
export const authLogout = () => {
  return (dispatch) => {
    try {
      dispatch({ type: authActions.authTry });
      dispatch({
        type: authActions.authLogout,
        isAuth: true,
        JWT: "some response from http",
      });
      dispatch({ type: authActions.authSuccess });
    } catch (e) {
      dispatch({ type: authActions.authError, isAuth: false, JWT: "" });
    }
  };
};
export const changeUserSettings = (newSettings) => {
  return (dispatch) => {
    dispatch({
      type: authActions.changeSettings,
      payload: newSettings,
    });
  };
};

export const authNonce = (token = "") => {
  return (dispatch) => {
    let wn = document.querySelector("#_wpnonce");
    if (wn) {
      dispatch({ type: authActions.authNonce, nonce: wn.value });
    } else {
      dispatch({ type: authActions.authNonce, nonce: "" });
    }
  };
};
