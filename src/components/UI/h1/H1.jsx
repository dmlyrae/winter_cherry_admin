import React from "react";

const H1 = ({ h1, descr }) => {
  return (
    <div className="flex flex-row align-middle">
      <div className="text-center flex-1 my-2">
        <span className="title__h1 dark:text-slate-300">{h1}</span>
        <span className="title__description">{descr}</span>
      </div>
    </div>
  );
};

export default H1;
