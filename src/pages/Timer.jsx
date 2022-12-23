import React, { useMemo, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import Timer from "../components/timer/Timer";
import Loader from "../components/UI/loader/Loader";

const TimerPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { updateContest, updateEvent } = useActions();
  const { contests } = useSelector((state) => state.contests);
  const makeVar = (string) => string.replace(/_/gi, " ").split("/");
  const [sortBy, setSortBy] = useState(["result", 1, ""]);
  const timers = useMemo(() => {
    const makeUrl = (stringArray) => stringArray.join("/").replace(/ /gi, "_");
    let names = Object.keys(contests);
    let result = names.reduce((p, n) => {
      p[n] = {};
      p[n]["url"] = makeUrl([n]);
      p[n]["name"] =
        n.length > 1 ? n.split(" ").join(" класс, категория ") : n + " класс";
      p[n]["commands"] = contests[n]["commands"].map((c) => ({
        id: c.id,
        name: c.name,
        sportsmen: c.sportsmen,
        url: makeUrl([c.id]),
        timerStart: "timer " + n + " " + c.id,
        timerCurrent: "timer " + n + " " + c.id + "_current",
        timerId: "timer " + n + " " + c.id + "_id",
        result: c.result,
      }));
      p[n]["commands"].forEach((c) => {
        c.timer = localStorage[c.timerStart]
          ? +localStorage[c.timerStart]
          : ((localStorage[c.timerStart] = "0"), 0);
        if (!localStorage[c.timerCurrent]) localStorage[c.timerCurrent] = "0";
        if (!localStorage[c.timerId]) localStorage[c.timerId] = "";
      });
      return p;
    }, {});
    return result;
  }, [contests]);
  const sortedCommands = useMemo(() => {
    if (!params.contest) return [];
    const name = makeVar(params.contest);
    const sortedPosts = timers[name]["commands"];
    if (sortBy[0] === "name")
      sortedPosts.sort((a, b) => (a[sortBy[0]] > b[sortBy[0]] ? -1 : 1));
    else sortedPosts.sort((a, b) => +a[sortBy[0]] - +b[sortBy[0]]);
    if (sortBy[1] > 0) sortedPosts.reverse();
    return sortedPosts.filter((e) => e.name.toLowerCase().includes(sortBy[2]));
  }, [sortBy, params, timers]);
  return (
    <>
      {Object.keys(timers).length === 0 ? (
        <Loader />
      ) : (
        <div className="page__content ">
          <div className="page__title title">
            <span className="title__h1">Таймеры</span>
            <span className="title__description">
              страница таймеров и отсечек
            </span>
          </div>
          {params.contest ? (
            params.command ? (
              <div>
                <Timer
                  contest={timers[makeVar(params.contest)]}
                  command={
                    timers[makeVar(params.contest)]["commands"].filter(
                      (c) => +c.id === +params.command
                    )[0]
                  }
                  goBack={() => {
                    navigate("/timer/" + params.contest, { replace: true });
                  }}
                  startTimer={(commandId) => {
                    const name = makeVar(params.contest);
                    const curContest = timers[name];
                    let x = 0;
                    curContest.commands.some((e, i) =>
                      e.id === commandId ? ((x = i), true) : false
                    );
                    const commands = contests[name]["commands"];
                    commands[x] = { ...contests[name]["commands"][x] };
                    updateEvent({
                      time: Date.now(),
                      message:
                        "На дистанции «" +
                        name +
                        "» стартовала команда «" +
                        commands[x]["name"] +
                        "».",
                    });
                  }}
                  stopTimer={(time, commandId) => {
                    const name = makeVar(params.contest);
                    const curContest = timers[name];
                    let x = 0;
                    curContest.commands.some((e, i) =>
                      e.id === commandId ? ((x = i), true) : false
                    );
                    const commands = contests[name]["commands"];
                    commands[x] = { ...contests[name]["commands"][x] };
                    commands[x]["result"] = Math.round(time / 1000);
                    updateContest({
                      name: makeVar(params.contest),
                      contest: {
                        commands: commands,
                      },
                    });
                    updateEvent({
                      time: Date.now(),
                      message:
                        "Новое время у команды «" +
                        commands[x]["name"] +
                        "» на дистанции «" +
                        name +
                        "»: " +
                        Math.floor(time / 60000) +
                        "мин. " +
                        Math.floor((time % 60000) / 1000) +
                        " сек.",
                    });
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center m-auto w-full px-4 sm:px-0 sm:w-2/3 ">
                <div
                  className="flex flex-row text-sky-500 hover:text-sky-600 cursor-pointer"
                  onClick={() => {
                    navigate("/timer", { replace: true });
                  }}
                >
                  <div className="px-1 ">
                    <button
                      className="icon-button text-xl dark:bg-transparent dark:text-sky-400 "
                      data-icon="i"
                    ></button>
                  </div>
                  <div
                    className="pl-3 group flex whitespace-pre-wrap  
            text-xl leading-8 font-semibold tracking-normal dark:text-sky-400"
                  >
                    <span className="">Дистанции: </span>
                    <span className="text-slate-600">
                      {timers[makeVar(params.contest)]["name"]}
                    </span>
                  </div>
                </div>
                <div
                  className="flex flex-row relative before:block 
              before:absolute before:content-[''] before:h-px 
              before:bg-slate-400 before:-bottom-3 before:-left-[5%] before:w-[110%]
              my-4
              "
                >
                  <div className="px-2 bg-slate-600 rounded-l-sm">
                    <button
                      className="icon-button icon-button_small text-white dark:bg-transparent "
                      data-icon="y"
                    ></button>
                  </div>
                  <div className="mx-0 flex-1">
                    <input
                      className="pl-4 focus:text-gray-700 focus:bg-white focus:border-none focus:outline-none rounded-r-sm"
                      placeholder="search by..."
                      onChange={(e) => {
                        setSortBy((prev) => {
                          prev[2] = e.target.value.trim().toLowerCase();
                          return [...prev];
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between cursor-pointer">
                  <div
                    className="px-2 hover:text-teal-600"
                    onClick={() => {
                      setSortBy((prev) => [
                        "timer",
                        prev[0] === "timer" ? -1 * prev[1] : 1,
                        prev[2],
                      ]);
                    }}
                  >
                    <button
                      className={
                        "icon-button icon-button_small dark:bg-transparent " +
                        (sortBy[0] === "timer" ? "allow" : "")
                      }
                      data-icon={
                        sortBy[0] === "timer" && sortBy[1] > 0 ? "S" : "R"
                      }
                    ></button>
                  </div>
                  <div
                    className="px-4 flex-1 hover:text-teal-600"
                    onClick={() => {
                      setSortBy((prev) => [
                        "name",
                        prev[0] === "name" ? -1 * prev[1] : 1,
                        prev[2],
                      ]);
                    }}
                  >
                    <button
                      className={
                        "icon-button icon-button_small dark:bg-transparent " +
                        (sortBy[0] === "name" ? "allow" : "")
                      }
                      data-icon={
                        sortBy[0] === "name" && sortBy[1] > 0 ? "S" : "R"
                      }
                    ></button>
                  </div>
                  <div
                    className="pr-11 hover:text-teal-600"
                    onClick={() => {
                      setSortBy((prev) => [
                        "result",
                        prev[0] === "result" ? -1 * prev[1] : 1,
                        prev[2],
                      ]);
                    }}
                  >
                    <button
                      className={
                        "icon-button icon-button_small dark:bg-transparent " +
                        (sortBy[0] === "result" ? "allow" : "")
                      }
                      data-icon={
                        sortBy[0] === "result" && sortBy[1] > 0 ? "S" : "R"
                      }
                    ></button>
                  </div>
                </div>
                {sortedCommands.map((t) => (
                  <div
                    onClick={() => {
                      navigate(t.url, { replace: true });
                    }}
                    key={t.url}
                    className="flex flex-row justify-between 
                  hover:bg-white hover:dark:bg-slate-700 
                  cursor-pointer"
                  >
                    <button
                      className={
                        "icon-button icon-button_small mx-2 dark:bg-transparent " +
                        (localStorage[t.timerStart] === "0" ? "" : "allow")
                      }
                      data-icon={localStorage[t.timerStart] === "0" ? "f" : "p"}
                    ></button>
                    <span className="mx-4 my-2 flex-1 text-start">
                      {t.name}
                    </span>
                    <span className="mx-4 my-2 text-end">
                      {(+t.result < 600 ? "0" : "") +
                        Math.floor(+t.result / 60) +
                        ":" +
                        (+t.result % 60 < 10 ? "0" : "") +
                        (+t.result % 60)}
                    </span>
                  </div>
                ))}
                <div
                  className="flex flex-row relative before:block 
              before:absolute before:content-[''] before:h-px 
              before:bg-slate-400 before:-left-[5%] before:w-[110%]
              my-4
              "
                ></div>
              </div>
            )
          ) : (
            <>
              <div className="flex flex-col justify-center m-auto mb-3 w-full  px-4 sm:px-0 sm:w-2/3 ">
                <div className="flex flex-row">
                  <div
                    className="ml-11 group flex whitespace-pre-wrap  mb-2 
            text-xl leading-8 text-sky-500 font-semibold tracking-normal dark:text-sky-400"
                  >
                    Дистанции
                  </div>
                </div>
              </div>
              <div
                className="flex flex-col justify-center m-auto w-full 
              px-4 sm:px-0 sm:w-2/3 
              relative 
              after:block 
              after:absolute after:content-[''] after:h-px 
              after:bg-slate-400 after:-top-3 after:-left-[5%] after:w-[110%]
              before:block 
              before:absolute before:content-[''] before:h-px 
              before:bg-slate-400 before:-bottom-3 before:-left-[5%] before:w-[110%]
            "
              >
                {Object.keys(timers).map((c) => (
                  <div
                    onClick={() => {
                      navigate(timers[c]["url"], { replace: true });
                    }}
                    key={timers[c]["url"]}
                    className="flex flex-row justify-between 
                  hover:bg-white hover:dark:bg-slate-700 
                  cursor-pointer"
                  >
                    <button
                      className={
                        "icon-button icon-button_small mx-2 dark:bg-transparent "
                      }
                      data-icon={"g"}
                    ></button>
                    <span className="mx-4 my-2 flex-1 text-start">
                      {timers[c]["name"]}
                    </span>
                    <span className="mx-4 my-2 text-end">
                      {"[ " +
                        timers[c]["commands"].reduce(
                          (p, c) => (c.result != 0 ? p + 1 : p),
                          0
                        ) +
                        "/" +
                        timers[c]["commands"].length +
                        " ]"}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default TimerPage;
