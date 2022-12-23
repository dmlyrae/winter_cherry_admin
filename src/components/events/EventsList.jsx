import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import Icon from "../UI/icon/Icon";

const EventsList = () => {
  const { events } = useSelector((s) => s.events);
  const { removeEvents } = useActions();
  return (
    <>
      <div className="h3__div under-line mt-4">
        <Icon char=")" fire />
        <span className="mt-1 ml-2">Последние события</span>
      </div>
      <div className="flex flex-col h-[20rem] w-full  overflow-y-scroll overflow-y--hidden p-2  my-4 ">
        {events.ids.map((id) => {
          const dateDif = Date.now() - events[id]["time"] - 1;
          const entityArray = [
            [1, "мс"],
            [1000, "сек."],
            [60000, "мин."],
            [3600000, "часов"],
            [86400000, "дней"],
            [2592000000, "месяцев"],
          ];
          let entityNumber = 0;
          while (dateDif / entityArray[entityNumber][0] > 1) {
            entityNumber++;
          }
          const timeAgo =
            Math.floor(dateDif / entityArray[entityNumber - 1][0]) +
            " " +
            entityArray[entityNumber - 1][1] +
            "";
          return (
            <div className="flex flex-row gap-1 my-1 " key={id + "event"}>
              <div className="w-6 text-center justify-center flex flex-col">
                <Icon char="*" small />
              </div>
              <div className="text-xs  w-16 md:w-24 justify-center flex flex-col">
                {timeAgo}
              </div>
              <div className="flex-1 ">{events[id]["message"]}</div>
            </div>
          );
        })}
      </div>
      <div className="h3__div under-line"></div>
    </>
  );
};
export default EventsList;
