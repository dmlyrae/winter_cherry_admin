import React, { useState, useMemo } from "react";
import cl from "./Pagination.module.scss";
import SimpleButton from "../button/SimpleButton";

const Pagination = ({
  nextFn,
  prevFn,
  goToPageFn,
  numberOfScreens,
  setPage,
  page,
}) => {
  const buttonArray = useMemo(
    () =>
      Array(numberOfScreens)
        .fill(undefined)
        .map((_, i) => [
          i,
          <SimpleButton
            key={i + "button"}
            addionalStyle={"mx-1"}
            action={() => {
              setPage(i);
              goToPageFn(i);
            }}
          >
            <span className="">{i + 1}</span>
          </SimpleButton>,
        ]),
    [numberOfScreens, goToPageFn, setPage]
  );
  if (numberOfScreens < 2) return <div className={cl["pagination"]}> </div>;
  return (
    <div className={cl["pagination"]}>
      {numberOfScreens > 1 ? (
        <SimpleButton
          key={"-1button"}
          action={() => {
            if (page === 0) return;
            // setPage(page - 1);
            prevFn();
          }}
        >
          prev
        </SimpleButton>
      ) : (
        <></>
      )}
      {buttonArray
        .slice(page > 1 ? page - 2 : 0, page > 1 ? page + 3 : 5)
        .map((b) => {
          if (b[0] === page)
            return (
              <button
                type="button"
                key={"xbutton"}
                className="inline-block mx-0.5 md:mx-1 px-1 py-1.5 md:px-2 md:py-2 lg:px-6 lg:py-2.5 bg-teal-600 text-white font-medium 
                text-sm md:text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg
              focus:bg-green-700 focus:shadow-lg focus:outlsne-none focus:ring-0 activ::bg-blue-800 
              active:shadow-lg transition duration-150 ease-in-out"
              >
                {"page " + (b[0] + 1)}
              </button>
            );
          return b[1];
        })}
      {numberOfScreens > 1 && (
        <SimpleButton
          key={"999button"}
          action={() => {
            if (page > numberOfScreens) return;
            //setPage(page + 1);
            nextFn();
          }}
        >
          next
        </SimpleButton>
      )}
    </div>
  );
};
export default Pagination;
