import React, { useState } from "react";
import { HiSelector } from "react-icons/hi";
import { BiLeftArrowAlt } from "react-icons/bi";
import cl from "./Select.module.scss";

export default function Select({ action, optionsList }) {
  const openSelect = (e) => {
    const ul = e.target.parentElement.querySelector("ul");
  };
  const [open, setOpen] = useState(false);
  return (
    <div
      className={
        cl["select"] + " bg-white dark:bg-slate-700 dark:shadow-black "
      }
    >
      <select name="select__select" className={cl["select__select"]}>
        {optionsList.map((o) => {
          return (
            <option key={"option" + o.value} value={o.value}>
              {o.text}
            </option>
          );
        })}
      </select>
      <div
        className={cl["select__open"] + " bg-white dark:bg-slate-700"}
        onClick={(e) => {
          setOpen(!open);
        }}
        data-id="open"
      >
        {" "}
        -- sort by --{" "}
      </div>
      <ul
        className={
          cl["select__options"] +
          (open ? " " + cl["select__options_visible"] : "")
        }
        onClick={() => {
          setOpen(!open);
        }}
      >
        {optionsList.map((o) => {
          return (
            <li
              key={"li" + o.value}
              data-value={o.value}
              className={cl["item"] + " bg-white dark:bg-slate-700"}
              onClick={(e) => {
                e.target.parentElement.parentElement.parentElement.querySelector(
                  '[data-id="open"]'
                ).innerHTML = o.text;
                action(o.value);
              }}
            >
              <span data-id="text" className={cl["item__text"]}>
                {o.text}
              </span>
              <span className={cl["item__icon"]}>
                <BiLeftArrowAlt size="1.5rem" />
              </span>
            </li>
          );
        })}
      </ul>
      <label
        htmlFor="select__select"
        className={cl["select__label"]}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <HiSelector size="1.5rem" />
      </label>
    </div>
  );
}
