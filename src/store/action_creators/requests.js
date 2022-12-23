import { requestsActions, validator } from "../vars/requests";
import { faker } from "@faker-js/faker";
import { createRef } from "react";

const generateFakeRequests = (sportsmen, locations) => {
  const distance = ["2", "3", "4"];
  const personal = [1, 0];
  const group = ["да", "нет"];
  const category = ["нет", "МЖ", "ММ"];
  const sportsmenIds = [...sportsmen.ids];
  const locationsIds = [...locations.ids];
  let requests = [];
  for (let i = 0; i < 150; i++) {
    const count = Array(Math.floor(1 + Math.random() * 3)).fill(undefined);
    const cat = faker.helpers.arrayElement(category);
    const dist = faker.helpers.arrayElement(distance);
    requests.push({
      "command-address": faker.helpers.arrayElement(locationsIds),
      "command-name": (
        faker.hacker.ingverb() +
        " " +
        faker.hacker.adjective()
      ).capitalize(),
      "command-fio": faker.name.fullName(),
      "command-phone": faker.phone.number("+7 ### ### ####"),
      sportsmen: count.map(() => {
        return {
          id: faker.helpers.arrayElement(sportsmenIds),
          member_distance: dist,
          member_personal: faker.helpers.arrayElement(personal),
          member_category: cat,
          member_group: faker.helpers.arrayElement(group),
        };
      }),
      approve: Math.floor(Math.random() * 2),
      trashed: 0,
      year: 2023,
      date: faker.date.recent(10),
      ref: createRef(null),
      sum: Math.floor(Math.random() * 15 + 1) * 100,
      id: i * 9 + 11,
    });
  }
  return {
    data: {
      status: "ok",
      result: requests,
      error: "",
    },
    headers: {},
  };
};

export const removeRequest = (id) => {
  return (dispatch) => {
    try {
      dispatch({ type: requestsActions.start });
      id = +id;
      if (typeof id !== "number") {
        throw new Error("Неверные данные");
      }
      dispatch({
        type: requestsActions.remove,
        payload: id,
      });
      dispatch({ type: requestsActions.success });
    } catch (e) {
      dispatch({
        type: requestsActions.error,
        payload: e.message,
      });
    }
  };
};

export const updateRequest = (request) => {
  return (dispatch) => {
    try {
      dispatch({ type: requestsActions.start });
      if (!validator(request)) {
        throw new Error("Неверные данные");
        // console.log("not valid");
      }
      dispatch({
        type: requestsActions.update,
        payload: [request],
      });
      dispatch({ type: requestsActions.success });
    } catch (e) {
      dispatch({
        type: requestsActions.error,
        payload: e.message,
      });
    }
  };
};
export const fetchRequests = (requests, locations) => {
  return (dispatch) => {
    try {
      dispatch({ type: requestsActions.start });
      const response = generateFakeRequests(requests, locations);
      dispatch({
        type: requestsActions.fetch,
        payload: response.data.result,
      });
      dispatch({ type: requestsActions.success });
    } catch (e) {
      dispatch({
        type: requestsActions.error,
        payload: e.message,
      });
    }
  };
};
