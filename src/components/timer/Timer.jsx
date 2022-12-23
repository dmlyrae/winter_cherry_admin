import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import cl from "./Timer.module.scss";
import { useNavigate } from "react-router-dom";
import Icon from "../UI/icon/Icon";
// import { useSelector } from "react-redux";

const Timer = ({ contest, command, startTimer, stopTimer, goBack }) => {
  const [workState, setWorkState] = useState(false);
  const [time, setTime] = useState(
    parseInt(localStorage[command.timerCurrent]) +
    (localStorage[command.timerStart] !== "0"
      ? Date.now() - parseInt(localStorage[command.timerStart])
      : 0)
  );
  const [timerId, setTimerId] = useState(0);
  const [error, setError] = useState(false);
  const [touchWork, setTouchWork] = useState(false);
  const [touchId, setTouchId] = useState(0);
  const touchRef = useRef();
  const touchIdRef = useRef();
  const timerIdRef = useRef();
  const workStateRef = useRef();
  const [loading, setLoading] = useState(false);
  timerIdRef.current = timerId;
  workStateRef.current = workState;
  touchRef.current = touchWork;
  touchIdRef.current = touchId;
  const startPauseHandler = useCallback(() => {
    if (
      !localStorage[command.timerStart] ||
      localStorage[command.timerStart] === "0"
    ) {
      setWorkState(true);
      localStorage[command.timerStart] = Date.now();
      startTimer(command.id);
      const id = setInterval(() => {
        setTime(
          () =>
            parseInt(localStorage[command.timerCurrent]) +
            Date.now() -
            parseInt(localStorage[command.timerStart])
        );
      }, 50);
      localStorage[command.timerId] = id;
    } else {
      setWorkState(false);
      clearInterval(parseInt(localStorage[command.timerId]));
      if (localStorage[command.timerStart] !== "0") {
        localStorage[command.timerCurrent] =
          parseInt(localStorage[command.timerCurrent]) +
          Date.now() -
          parseInt(localStorage[command.timerStart]);
        localStorage[command.timerStart] = "0";
      }
    }
  }, []);
  const updateHandler = useCallback(async () => {
    setWorkState(false);
    clearInterval(parseInt(localStorage[command.timerId]));
    setLoading(true);
    const result = await stopTimer(
      parseInt(localStorage[command.timerCurrent]),
      command.id
    );
    if (result) setError(true);
    // setLoading(false);
    setTimeout(() => setLoading(false), 1000);
    localStorage[command.timerStart] = "0";
    localStorage[command.timerCurrent] = "0";
  }, []);
  const timeRef = useRef();
  timeRef.current = time;
  const parseTime = useCallback(() => {
    let t = timeRef.current;
    let ms = t % 1000;
    t = Math.floor((t - ms) / 1000);
    ms = Math.floor(ms / 10);
    const s = t % 60;
    t = Math.floor((t - s) / 60);
    return [
      t < 10 ? "0" + t : t,
      s < 10 ? "0" + s : s,
      ms < 10 ? "0" + ms : ms,
    ];
  }, []);
  useEffect(() => {
    if (workState) return;
    if (localStorage[command.timerStart] !== "0") {
      setWorkState(true);
      clearInterval(parseInt(localStorage[command.timerId]));
      const id = setInterval(() => {
        setTime(
          () =>
            parseInt(localStorage[command.timerCurrent]) +
            Date.now() -
            parseInt(localStorage[command.timerStart])
        );
      }, 50);
      localStorage[command.timerId] = id;
    }
  }, []);
  return (
    <div
      className={cl["timer"]}
      onDoubleClick={(e) => {
        e.preventDefault();
      }}
      onMouseUp={() => {
        setTouchWork(false);
        setTouchId(Date.now());
      }}
    >
      <div className={cl["timer__back-link"]} onClick={goBack}>
        <div className="px-1 ">
          <button
            className="icon-button dark:bg-slate-900 dark:text-sky-400 "
            data-icon="i"
          ></button>
        </div>
        <div
          className="pl-3 group flex whitespace-pre-wrap  
            leading-8 md:font-semibold tracking-normal dark:text-sky-400"
        >
          <span className={cl["timer__title_cont"]}>{contest.name + " "}</span>
          <span className={cl["timer__title_comm"]}>{command.name}</span>
        </div>
      </div>
      <div className={cl["timer__time"] + " " + cl["time"]}>
        <div className={cl["time__digits"] + " " + cl["time__digits_minutes"]}>
          <div
            className={
              cl["time__up-button"] +
              " dark:text-slate-100 " +
              (workState ? cl["work"] : cl["stop"])
            }
          >
            <button
              className="icon-button icon-button_large dark:rounded-md "
              data-icon="S"
              onMouseDown={(e) => {
                e.preventDefault();
                setTouchWork(() => true);
                let growFn = (iter, tId) => {
                  if (tId !== touchIdRef.current) return;
                  if (iter !== 0 && !touchRef.current) return;
                  let timeout = 300;
                  if (iter > 0) timeout = 150;
                  if (iter > 3) timeout = 100;
                  setTime((prev) => prev + 60000);
                  const t = +localStorage[command.timerCurrent];
                  localStorage[command.timerCurrent] = t + 60000;
                  setTimeout(() => {
                    growFn(iter + 1, tId);
                  }, timeout);
                };
                growFn(0, 0 + touchIdRef.current);
              }}
            ></button>
          </div>
          <div className={cl["time__amount"]} data-descr="minutes">
            {parseTime()[0]}
          </div>
          <div
            className={
              cl["time__down-button"] +
              " " +
              (workState ? cl["work"] : cl["stop"])
            }
          >
            <button
              className="icon-button icon-button_large  dark:rounded-md "
              data-icon="R"
              onMouseDown={(e) => {
                e.preventDefault();
                setTouchWork(() => true);
                let growFn = (iter, tId) => {
                  if (tId !== touchIdRef.current) return;
                  if (iter !== 0 && !touchRef.current) return;
                  let timeout = 300;
                  if (iter > 0) timeout = 150;
                  if (iter > 3) timeout = 100;
                  setTime((prev) => (prev > 60000 ? prev - 60000 : 0));
                  const t = +localStorage[command.timerCurrent];
                  localStorage[command.timerCurrent] =
                    t > 60000 ? t - 60000 : 0;
                  setTimeout(() => {
                    growFn(iter + 1, tId);
                  }, timeout);
                };
                growFn(0, 0 + touchIdRef.current);
              }}
            ></button>
          </div>
        </div>
        <div className={cl["time__delimeter"]}>
          <div className="">:</div>
        </div>
        <div className={cl["time__digits"] + " " + cl["time__digits_seconds"]}>
          <div
            className={
              cl["time__up-button"] +
              " " +
              (workState ? cl["work"] : cl["stop"])
            }
          >
            <button
              className="icon-button icon-button_large  dark:rounded-md "
              data-icon="S"
              onMouseDown={(e) => {
                e.preventDefault();
                setTouchWork(() => true);
                let growFn = (iter, tId) => {
                  if (tId !== touchIdRef.current) return;
                  if (iter !== 0 && !touchRef.current) return;
                  let timeout = 300;
                  if (iter > 0) timeout = 150;
                  if (iter > 3) timeout = 100;
                  setTime((prev) => prev + 1000);
                  localStorage[command.timerCurrent] =
                    +localStorage[command.timerCurrent] + 1000;
                  setTimeout(() => {
                    growFn(iter + 1, tId);
                  }, timeout);
                };
                growFn(0, 0 + touchIdRef.current);
              }}
            ></button>
          </div>
          <div className={cl["time__amount"]} data-descr="seconds">
            {parseTime()[1]}
          </div>
          <div
            className={
              cl["time__down-button"] +
              " " +
              (workState ? cl["work"] : cl["stop"])
            }
          >
            <button
              className="icon-button icon-button_large  dark:rounded-md "
              data-icon="R"
              onMouseDown={(e) => {
                e.preventDefault();
                setTouchWork(() => true);
                let growFn = (iter, tId) => {
                  if (tId !== touchIdRef.current) return;
                  if (iter !== 0 && !touchRef.current) return;
                  let timeout = 300;
                  if (iter > 0) timeout = 150;
                  if (iter > 3) timeout = 100;
                  setTime((prev) => (prev > 1000 ? prev - 1000 : 0));
                  const t = +localStorage[command.timerCurrent];
                  localStorage[command.timerCurrent] = t > 1000 ? t - 1000 : 0;
                  setTimeout(() => {
                    growFn(iter + 1, tId);
                  }, timeout);
                };
                growFn(0, 0 + touchIdRef.current);
              }}
            ></button>
          </div>
        </div>
        <div className={cl["time__delimeter"]}>
          <div className="">:</div>
        </div>
        <div
          className={cl["time__digits"] + " " + cl["time__digits_milliseconds"]}
        >
          <div className={cl["time__amount"]} data-descr="millisec">
            {parseTime()[2]}
          </div>
        </div>
      </div>
      <div className={cl["timer__update-block"]}>
        <div className={cl["start-stop"]}>
          <button
            className="icon-button icon-button_normal allow"
            data-icon={workState ? "Z" : "p"}
            onClick={startPauseHandler}
          >
            <span className="p-2 text-3xl align-middle">
              {workState ? "pause" : "start"}
            </span>
          </button>
        </div>
        <div className={cl["update"]}>
          {workState ? (
            <></>
          ) : (
            <button
              className={
                "icon-button icon-button_normal allow " +
                (loading ? "animate" : "")
              }
              data-icon={loading ? "P" : "b"}
              onClick={updateHandler}
            >
              <span className="p-2 text-3xl h-full leading-8 w-10 align-middle">
                {error ? "error" : "update"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;
