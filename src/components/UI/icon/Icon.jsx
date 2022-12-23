import React from "react";
import cl from "./Icon.module.scss";

const Icon = (props) => {
  const { char, ...state } = props;
  return (
    <span
      className={
        cl["icon"] + Object.keys(state).reduce((p, c) => p + " " + cl[c], "")
      }
      data-icon={char}
    ></span>
  );
};
export default Icon;
