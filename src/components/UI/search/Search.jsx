import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import cl from "./Search.module.scss";

export default function Search({ placeholder, action }) {
  return (
    <div className={cl["search"] + " shadow-slate-600 dark:shadow-black"}>
      <label htmlFor="toolbar__input" className={cl["search__label"]}>
        <BiSearchAlt2 size="1.5rem" />
      </label>
      <input
        name="toobar__input"
        className={cl["search__input"] + " bg-white dark:bg-slate-700 "}
        placeholder={placeholder}
        onInput={action}
      />
    </div>
  );
}
