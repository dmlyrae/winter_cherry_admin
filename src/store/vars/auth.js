export const defaultState = {
  isAuth: false,
  loadingAuth: false,
  JWT: "",
  userinfo: { username: "username" },
  userSettings: { darkMode: false, userPrivilegy: "admin" },
  wpNonce: "",
};

export const authActions = {
  authTry: "AUTH_TRY",
  authLogin: "AUTH_LOGIN",
  authLogout: "AUTH_LOGOUT",
  authNonce: "AUTH_NONCE",
  authSuccess: "AUTH_SUCCESS",
  authError: "AUTH_ERROR",
  changeSettings: "AUTH_SETTINGS_CHANGE",
};
