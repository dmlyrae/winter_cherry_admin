import { defaultState, authActions } from "../vars/auth";

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case authActions.authTry:
      return { ...state, loadingAuth: true };
    case authActions.authNonce:
      return { ...state, wpNonce: action.nonce };
    case authActions.authLogout:
      return { ...state, isAuth: false, JWT: "" };
    case authActions.authLogin:
      return {
        ...state,
        isAuth: true,
        JWT: "some response",
        userInfo: action.userInfo,
      };
    case authActions.authSuccess:
      return { ...state, loadingAuth: false };
    case authActions.authError:
      return { ...state, loadingAuth: false, isAuth: false };
    case authActions.changeSettings:
      return {
        ...state,
        userSettings: { ...state.userSettings, ...action.payload },
      };
    default:
      return state;
  }
};
