import { locationsActions, validator } from "../vars/locations";
import { faker } from "@faker-js/faker";

const generateFakeLocations = () => ({
  data: {
    status: "ok",
    result: Array(20)
      .fill(undefined)
      .map((_, i) => ({
        name: faker.address.cityName(),
        id: i * 7 + 3,
      })),
    error: "",
  },
  headers: {},
});

export const removeLocation = (id) => {
  return (dispatch) => {
    try {
      dispatch({ type: locationsActions.start });
      id = +id;
      if (typeof id !== "number") {
        // throw new Error("Неверные данные");
      }
      dispatch({
        type: locationsActions.remove,
        payload: id,
      });
      dispatch({ type: locationsActions.success });
    } catch (e) {
      dispatch({
        type: locationsActions.error,
        payload: e.message,
      });
    }
  };
};

export const updateLocation = (location) => {
  return (dispatch) => {
    try {
      dispatch({ type: locationsActions.start });
      if (!validator(location)) {
        console.log("not valid");
        // throw new Error("Неверные данные");
      }
      dispatch({
        type: locationsActions.update,
        payload: [location],
      });
      dispatch({ type: locationsActions.success });
    } catch (e) {
      dispatch({
        type: locationsActions.error,
        payload: e.message,
      });
    }
  };
};
export const fetchLocations = () => {
  return (dispatch) => {
    try {
      dispatch({ type: locationsActions.start });
      const response = generateFakeLocations();
      dispatch({
        type: locationsActions.fetch,
        payload: response.data.result,
      });
      dispatch({ type: locationsActions.success });
    } catch (e) {
      dispatch({
        type: locationsActions.error,
        payload: e.message,
      });
    }
  };
};
