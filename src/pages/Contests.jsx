import React, { useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import H1 from "../components/UI/h1/H1";

const Contests = () => {
  const { contests } = useSelector((state) => state.contests);
  const { updateContest } = useActions();
  const [lastActionId, setLastActionId] = useState(0);
  const [currentContest, setCurrentContest] = useState(
    Object.keys(contests)[0]
  );
  const { updateEvent } = useActions();
  const commandList = useMemo(() => {
    let list = [];
    contests[currentContest]["commands"].forEach((c) => {
      list.push({
        nodeRef: c.nodeRef,
        id: c.id,
        name: c.name,
        sportsmen: c.sportsmen.map((s) => ({
          id: s.id,
          name: s.name,
        })),
        penalty: c.penalty,
        result: c.result,
      });
    });
    return list;
  }, [currentContest, lastActionId]);
  const inc = useRef();
  inc.current = contests[currentContest]["penaltyIncrement"];
  return (
    <div className="page__content">
      <div className="m-0 flex flex-row justify-between align-middle gap-0 md:gap-2 lg:gap-4 px-2 md:px-0">
        {Object.keys(contests).map((cn, i) => (
          <div
            key={i + cn}
            className={
              "text-center  shadow-slate-300 shadow-md leading-10 opacity-80 cursor-pointer " +
              "px-1 sm:px-3 md:px-6 lg:px-8 " +
              "first-letter:hover:opacity-100 hover:shadow-slate-400 dark:shadow-black rounded-b-md pb-0 pt-3 px-2 " +
              (cn === currentContest
                ? "bg-teal-600 text-white font-semibold"
                : "bg-white dark:bg-slate-700  ")
            }
            onClick={() => {
              setCurrentContest(cn);
            }}
          >
            {cn}
          </div>
        ))}
      </div>
      <div className="flex my-auto flex-col gap-4 mt-2 align-middle text-slate-600 dark:text-slate-200 px-2 md:px-0">
        <H1
          h1={"- " + currentContest + " -"}
          descr={"Результаты на дистанции " + currentContest}
        />
        <div
          className="text-center my-2 flex flex-row justify-center"
          ref={contests[currentContest]["nodeRef"]}
        >
          <div className="flex-1">
            <input
              className="py-1 px-3 rounded-sm"
              value={contests[currentContest]["penaltyIncrement"]}
              data-name={"increment"}
              onChange={() => {
                updateContest({
                  name: currentContest,
                  contest: {
                    penaltyIncrement: contests[currentContest]["nodeRef"][
                      "current"
                    ].querySelector('[data-name="increment"]').value,
                  },
                });
                setLastActionId(lastActionId + 1);
              }}
            />
            <legend className=" text-slate-400 text-sm">
              Штрафной инкремент (сек.)
            </legend>
          </div>
          <div className="flex-1">
            <input
              className="py-1 px-3 rounded-sm"
              value={contests[currentContest]["judge"]}
              data-name={"judge"}
              onChange={() => {
                updateContest({
                  name: currentContest,
                  contest: {
                    judge: contests[currentContest]["nodeRef"][
                      "current"
                    ].querySelector('[data-name="judge"]').value,
                  },
                });
                setLastActionId(lastActionId + 1);
              }}
            />
            <legend className="text-sm text-slate-400">Судья дистанции</legend>
          </div>
        </div>
        {commandList.map((s, i) => (
          <div
            key={s.id}
            className="flex flex-row gap-1 border-y border-slate-300 "
          >
            <div
              className="w-20 flex flex-row justify-between text-right pr-2"
              data-save="1"
              data-value={s.id}
            >
              <button
                className="icon-button deny icon-button_small dark:bg-slate-900"
                data-icon="L"
                onClick={() => {
                  updateContest({
                    name: currentContest,
                    contest: {
                      nodeRef: contests[currentContest]["nodeRef"],
                      penaltyIncrement: contests[currentContest]["nodeRef"][
                        "current"
                      ].querySelector('[data-name="increment"]').value,
                      judge: contests[currentContest]["nodeRef"][
                        "current"
                      ].querySelector('[data-name="judge"]').value,
                      commands: commandList.filter((c) => c.id !== s.id),
                    },
                  });
                  setLastActionId(lastActionId + 1);
                }}
              ></button>
              <span className="collapse"> {s.id}</span>
              <span className="font-semibold"> {i}</span>
            </div>
            <div className="basis-1/2 flex flex-col" data-save="2">
              <div className="font-semibold">{s.name}</div>
              {s.sportsmen.length > 1 ? (
                s.sportsmen.map((sp) => (
                  <div className="text-sm" key={sp.id}>
                    {sp.name}
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            <div
              className="flex-1 flex-col flex justify-center text-center"
              data-save="1"
              data-value={s.result}
              contentEditable="true"
              suppressContentEditableWarning={true}
              onBlur={(e) => {
                let result = e.target.innerText
                  .split(":")
                  .map((d) => d.trim())
                  .map((d) => parseInt(d))
                  .map((d) => (d ? d : 0));
                // e.target.dataset.value = result[0] * 60 + result[1];
                commandList[i]["result"] =
                  result[0] * 60 + result[1] - inc.current * s.penalty;
                updateContest({
                  name: currentContest,
                  contest: {
                    commands: commandList,
                  },
                });
                setLastActionId(lastActionId + 1);
              }}
            >
              {(+s.result + inc.current * s.penalty < 600 ? "0" : "") +
                Math.floor((+s.result + inc.current * s.penalty) / 60) +
                ":" +
                ((+s.result + inc.current * s.penalty) % 60 < 10 ? "0" : "") +
                ((+s.result + inc.current * s.penalty) % 60)}
            </div>
            <div
              className="flex-1 flex flex-row"
              data-save="1"
              data-value={s.penalty}
            >
              <button
                className="flex-1 icon-button icon-button_small text-end dark:bg-slate-900"
                data-icon="Y"
                onClick={() => {
                  if (s.penalty === 0) return;
                  commandList[i]["penalty"] = s.penalty - 1;
                  updateContest({
                    name: currentContest,
                    contest: {
                      commands: commandList,
                    },
                  });
                  setLastActionId(lastActionId + 1);
                }}
              ></button>
              <span className="flex-1 flex flex-col text-center justify-center align-middle">
                {s.penalty}
              </span>
              <button
                className="flex-1 icon-button icon-button_small text-start dark:bg-slate-900"
                data-icon="X"
                onClick={() => {
                  commandList[i]["penalty"] = s.penalty + 1;
                  updateContest({
                    name: currentContest,
                    contest: {
                      commands: commandList,
                    },
                  });
                  setLastActionId(lastActionId + 1);
                }}
              ></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contests;
