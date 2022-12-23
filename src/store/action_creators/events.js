import { eventsActions, validator } from "../vars/events";
import { faker } from "@faker-js/faker";

const generateFakeEvents = () => ({
  data: {
    status: "ok",
    result: Array(15)
      .fill(undefined)
      .map((_, i) => ({
        message: faker.hacker.phrase(),
        time: Date.now(),
        id: i,
      })),
    error: "",
  },
  headers: {},
});

export const removeEvent = (id) => {
  return (dispatch) => {
    try {
      dispatch({ type: eventsActions.start });
      id = +id;
      if (typeof id !== "number") {
        throw new Error("Неверные данные");
      }
      dispatch({
        type: eventsActions.remove,
        payload: id,
      });
      dispatch({ type: eventsActions.success });
    } catch (e) {
      dispatch({
        type: eventsActions.error,
        payload: e.message,
      });
    }
  };
};

export const updateEvent = (event) => {
  return (dispatch) => {
    try {
      console.log("try add event", event);
      dispatch({ type: eventsActions.start });
      if (!validator(event)) {
        // throw new Error("Неверные данные");
        console.log("not valid event");
      }
      dispatch({
        type: eventsActions.update,
        payload: [event],
      });
      dispatch({ type: eventsActions.success });
    } catch (e) {
      dispatch({
        type: eventsActions.error,
        payload: e.message,
      });
    }
  };
};
export const fetchEvents = () => {
  return (dispatch) => {
    try {
      dispatch({ type: eventsActions.start });
      const response = generateFakeEvents();
      dispatch({
        type: eventsActions.fetch,
        payload: response.data.result,
      });
      dispatch({ type: eventsActions.success });
    } catch (e) {
      dispatch({
        type: eventsActions.error,
        payload: e.message,
      });
    }
  };
};
