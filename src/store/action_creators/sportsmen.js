import { sportsmenActions, validator } from "../vars/sportsmen";
import { faker } from "@faker-js/faker";
// import RequestService from "../../API/RequestService";
// import { useFetching } from "../../hooks/useFetching";
import { createRef } from "react";

const generateFakeSportsmen = () => ({
  data: {
    status: "ok",
    result: Array(200)
      .fill(undefined)
      .map((_, i) => ({
        name: faker.name.fullName(),
        birthday: faker.date.birthdate().toDateString(),
        rank_sp: faker.helpers.arrayElement([
          "без разряда",
          "I разряд",
          "II разряд",
          "КМС",
          "МС",
        ]),
        gender: faker.name.sexType(),
        id: i * 2,
        trashed: false,
        ref: createRef(null),
      })),
    error: "",
  },
  headers: {},
});

const requestTrueSportsmen = () => {
  /*  const [fetchRequests, isLoading, error] = useFetching(async () => {
    const response = await RequestService.getSportsmen();
    if (response.data.status === "ok") {
      let sp = [];
      response.data.result.forEach((r) => {
        if (Array.isArray(r["sportsmen"])) {
          r["sportsmen"].forEach((s) => {
            s.nodeRef = createRef(null);
            sp.push(s);
          });
        } else {
          sp.push(r);
        }
      });
    }
  });*/
};

export const removeSportsman = (id) => {
  return (dispatch) => {
    try {
      dispatch({ type: sportsmenActions.start });
      id = +id;
      if (typeof id !== "number") {
        throw new Error("Неверные данные");
      }
      dispatch({
        type: sportsmenActions.remove,
        payload: id,
      });
      dispatch({ type: sportsmenActions.success });
    } catch (e) {
      dispatch({
        type: sportsmenActions.error,
        payload: e.message,
      });
    }
  };
};

export const updateSportsman = (sportsman) => {
  return (dispatch) => {
    try {
      dispatch({ type: sportsmenActions.start });
      if (!validator(sportsman)) {
        // throw new Error("Неверные данные");
        console.log("not valid");
      }
      dispatch({
        type: sportsmenActions.update,
        payload: [sportsman],
      });
      dispatch({ type: sportsmenActions.success });
    } catch (e) {
      dispatch({
        type: sportsmenActions.error,
        payload: e.message,
      });
    }
  };
};
export const fetchSportsmen = () => {
  return (dispatch) => {
    try {
      dispatch({ type: sportsmenActions.start });
      const response = generateFakeSportsmen();
      dispatch({
        type: sportsmenActions.fetch,
        payload: response.data.result,
      });
      dispatch({ type: sportsmenActions.success });
    } catch (e) {
      dispatch({
        type: sportsmenActions.error,
        payload: e.message,
      });
    }
  };
};
