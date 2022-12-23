import React, { useState } from "react";
import cl from "./Locaton.module.scss";
import Icon from "../icon/Icon";

const LocationCard = ({ location, saveLo, deleteLo, ref }) => {
  const [saving, setSaving] = useState(false);
  const saveLocation = async (e) => {
    setSaving(true);
    let parent;
    if (e.target.dataset.id) parent = e.target.parentNode.parentNode;
    else parent = e.target.parentNode.parentNode.parentNode;
    if (!location.id) location.id = 0;
    let saveObject = Array.from(
      parent.querySelectorAll('[data-save="1"]')
    ).reduce((p, c) => {
      p[c.dataset["name"]] = c.innerHTML.trim();
      return p;
    }, {});
    if (!saveObject.id) saveObject.id = 0;
    const attempt = await saveLo(saveObject);
    setSaving(false);
  };
  const removeLocation = (id) => {
    deleteLo(+id);
  };

  return (
    <div
      className={cl["card"] + " dark:bg-slate-700 dark:shadow-black"}
      ref={ref}
    >
      <div
        className={cl["card__title-block"]}
        contentEditable="true"
        suppressContentEditableWarning={true}
        data-save="1"
        data-name="name"
        onInput={() => {
          setSaving(true);
        }}
      >
        {location["name"]}
      </div>
      <div className="collapse basis-1/2" data-save="1" data-name="description">
        {location["description"]}
      </div>
      <div className="collapse basis-1/2" data-save="1" data-name="id">
        {location["id"]}
      </div>
      <div className={cl["card__button-block"]}>
        <button
          className={cl["button"]}
          onClick={saveLocation}
          data-id={location["id"]}
        >
          {saving ? <Icon char="P" spin allow /> : <Icon char="E" allow />}
        </button>
        <button
          className={cl["button"]}
          onClick={() => removeLocation(location["id"])}
          data-id={location["id"]}
        >
          <Icon char="L" deny />
        </button>
      </div>
    </div>
  );
};

export default LocationCard;
