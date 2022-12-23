import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Icon from "../UI/icon/Icon";
import cl from "./Statistics.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Statistics = () => {
  const { sportsmen } = useSelector((s) => s.sportsmen);
  const { contests } = useSelector((s) => s.contests);
  const { requests } = useSelector((s) => s.requests);
  const { locations } = useSelector((s) => s.locations);
  //количетство спортсменов
  //количество заявок
  //главный город
  //до старта соревнований
  //общая сумма взносов
  // самая быстрая команда
  const donateSum = requests.ids.reduce((p, c) => p + +requests[c]["sum"], 0);
  const requestIds = useMemo(() => requests.ids, [requests]);

  const townArray = useMemo(() => {
    const obj = requestIds.reduce((p, c) => {
      const n = requests[c]["command-address"];
      p[n] = p[n]
        ? p[n] + Object.keys(requests[c]["sportsmen"]).length
        : Object.keys(requests[c]["sportsmen"]).length;
      return p;
    }, {});
    const allSportsmen = Object.keys(obj).reduce((p, n) => p + obj[n], 0);
    return Object.keys(obj)
      .reduce(
        (p, c) => [
          ...p,
          [
            locations[+c]["name"],
            obj[c],
            Math.round((100 * obj[c]) / allSportsmen) + "%",
            Math.round((360 * obj[c]) / allSportsmen),
          ],
        ],
        []
      )
      .sort((a, b) => b[1] - a[1]);
  }, [requestIds]);

  const approveRequests = useMemo(
    () => requests.ids.filter((r) => requests[r]["approve"]),
    [requests]
  );
  const reqPerc = useMemo(() => {
    let res = [0, 0];
    res[0] = approveRequests.length / requestIds.length;
    res[1] = 360 * res[0];
    res[0] = Math.round(res[0] * 100) + "%";
    return res;
  }, [requestIds, approveRequests]);

  return (
    <div className="my-12">
      <div className="h3__div under-line">
        <Icon char="&" deny />
        <span className="ml-2">Статистика</span>
      </div>
      <div className="w-full p-2 mt-4 mb-8 ">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          spaceBetween={10}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <div
              className={cl["card"] + " dark:bg-slate-700 dark:shadow-black"}
            >
              <div
                className={
                  cl["card__donut"] +
                  " " +
                  cl["donut-chart"] +
                  " " +
                  cl["chart2"]
                }
              >
                <div
                  className={
                    cl["slice"] + " " + cl["two"] + " bg-red-800 text-red-700"
                  }
                  style={{ transform: "rotate(" + reqPerc[1] + "deg)" }}
                ></div>
                <div className={cl["slice"] + " " + cl["one"]}></div>
                <div className={cl["chart-center"]}>
                  <span data-perc={reqPerc[0]}></span>
                </div>
              </div>
              <div className={cl["card__text"]}>
                <div className={cl["card__h1"]}>Одобрено заявок</div>
                <div className={cl["card__info"]}>
                  {"Всего подали заявок " + requestIds.length + " команд."}
                </div>
                <div className={cl["card__info"]}>
                  {"Из них оплачено и одобрено " + approveRequests.length + "."}
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={cl["card"] + " dark:bg-slate-700 dark:shadow-black"}
            >
              <div
                className={
                  cl["card__donut"] +
                  " " +
                  cl["donut-chart"] +
                  " " +
                  cl["chart2"]
                }
              >
                <div
                  className={cl["slice"] + " " + cl["two"] + ""}
                  style={
                    townArray[0][3] < 180
                      ? {
                        transform: "rotate(0deg)",
                        background: "#cbd5e1",
                      }
                      : {}
                  }
                ></div>
                <div
                  className={cl["slice"] + " " + cl["one"]}
                  style={
                    townArray[0][3] < 180
                      ? {
                        background: "#cbd5e1",
                        transform:
                          "rotate(" + (townArray[0][3] + 90) + "deg)",
                      }
                      : {}
                  }
                ></div>
                <div className={cl["chart-center"]}>
                  <span data-perc={townArray[0][2]}></span>
                </div>
              </div>
              <div className={cl["card__text"]}>
                <div className={cl["card__h1"]}>
                  {"Спортсменов из города " + townArray[0][0]}
                </div>
                <div className={cl["card__info"]}>
                  {"Всего в заявках " +
                    townArray.reduce((p, c) => p + c[1], 0) +
                    " спортсменов."}
                </div>
                <div className={cl["card__info"]}>
                  {"На втором и третьем местах города " +
                    townArray[1][0] +
                    " и " +
                    townArray[2][0] +
                    "."}
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
export default Statistics;
