import React, { useState } from "react";
import cl from "./Sportsman.module.scss";
import Icon from "../icon/Icon";

const SportsmanCard = ({ sportsman, ref, saveSp, deleteSp }) => {
  const [saving, setSaving] = useState(0);
  const saveSportsman = async (e) => {
    setSaving(2);
    let parent;
    if (e.target.dataset.id) parent = e.target.parentNode.parentNode;
    else parent = e.target.parentNode.parentNode.parentNode;
    let saveObject = Array.from(parent.querySelectorAll('[data-save="1"]'));
    saveObject = saveObject.reduce((p, c) => {
      p[c.dataset["name"]] = c.innerHTML.trim();
      return p;
    }, {});
    saveObject["id"] = +saveObject["id"];
    // const attempt = await saveSp(saveObject);
    const attempt = saveSp(saveObject);
    setSaving(0);
  };
  const removeSportsman = (id) => {
    const attempt = deleteSp(+id);
  };
  return (
    <div
      className={cl["card"] + " bg-white dark:bg-slate-700 dark:shadow-black "}
      ref={ref}
    >
      <div
        className={cl["card__title-block"]}
        contentEditable="true"
        suppressContentEditableWarning={true}
        data-save="1"
        data-name="name"
        onInput={() => {
          setSaving(1);
        }}
      >
        {sportsman["name"]}
      </div>
      <div className={cl["card__info-block"]}>
        <div
          className=""
          contentEditable="true"
          suppressContentEditableWarning={true}
          data-save="1"
          data-name="birthday"
          onInput={() => {
            setSaving(1);
          }}
        >
          {sportsman["birthday"]}
        </div>
        <div
          className=""
          contentEditable="true"
          suppressContentEditableWarning={true}
          data-save="1"
          data-name="rank_sp"
          onInput={() => {
            setSaving(1);
          }}
        >
          {sportsman["rank_sp"]}
        </div>
        <div className="" data-save="1" data-name="gender">
          {sportsman["gender"]}
        </div>
        <div className="" data-save="1" data-name="id">
          {sportsman["id"]}
        </div>
      </div>
      <div className={cl["card__button-block"]}>
        <button
          className={cl["button"]}
          onClick={saveSportsman}
          data-id={sportsman["id"]}
        >
          {saving ? <Icon char="P" spin allow /> : <Icon char="E" allow />}
        </button>
        <button
          className={cl["button"]}
          onClick={() => removeSportsman(sportsman["id"])}
          data-id={sportsman["id"]}
        >
          <Icon char="L" deny />
        </button>
      </div>
    </div>
  );
};

export default SportsmanCard;
