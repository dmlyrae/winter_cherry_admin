import { createRef } from "react";
import { contestsActions, validator } from "../vars/contests";

const generateFakeContest = (requests, sportsmen) => {
  let contests = {};
  for (let r of requests) {
    let nameDist =
      r["sportsmen"][Object.keys(r["sportsmen"])[0]]["member_distance"];
    if (!contests[nameDist])
      contests[nameDist] = {
        nodeRef: createRef(null),
        commands: [],
        penaltyIncrement: 15,
        judge: "Ivan Ivanov",
      };
    let add = r["sportsmen"][Object.keys(r["sportsmen"])[0]]["member_category"];
    let nameFull = nameDist;
    if (add !== "нет") {
      nameFull = nameFull + " " + add;
    }
    if (!contests[nameFull])
      contests[nameFull] = {
        nodeRef: createRef(null),
        commands: [],
        penaltyIncrement: 15,
        judge: "Petr Petrov",
      };
    let command = {
      sportsmen: [],
      result: 0,
      penalty: 0,
      name: r["command-name"],
      id: r["id"],
    };
    for (let s of r.sportsmen) {
      command.sportsmen.push({
        id: s["id"],
        name: sportsmen[s["id"]]["name"],
      });
      if (nameFull !== nameDist && s["member_personal"] === 1) {
        if (contests[nameDist]["commands"].every((e) => e.id !== s.id)) {
          contests[nameDist]["commands"].push({
            nodeRef: createRef(null),
            name: sportsmen[s["id"]]["name"],
            sportsmen: [{ id: s["id"], name: sportsmen[s["id"]]["name"] }],
            result: 0,
            penalty: 0,
            id: s["id"],
          });
        }
      }
    }
    if (contests[nameFull]["commands"].every((e) => e.id !== r.id)) {
      contests[nameFull]["commands"].push(command);
    }
  }
  return {
    data: {
      status: "ok",
      result: contests,
      error: "",
    },
    headers: {},
  };
};

export const updateContest = (updateObject) => {
  return (dispatch) => {
    try {
      dispatch({ type: contestsActions.start });
      dispatch({
        type: contestsActions.update,
        payload: updateObject,
      });
      dispatch({ type: contestsActions.success });
    } catch (e) {
      dispatch({
        type: contestsActions.error,
        payload: e.message,
      });
    }
  };
};

export const fetchContests = (requests, sportsmen) => {
  return (dispatch) => {
    try {
      dispatch({ type: contestsActions.start });
      const response = generateFakeContest(requests, sportsmen);
      dispatch({
        type: contestsActions.fetch,
        payload: response.data.result,
      });
      dispatch({ type: contestsActions.success });
    } catch (e) {
      dispatch({
        type: contestsActions.error,
        payload: e.message,
      });
    }
  };
};
