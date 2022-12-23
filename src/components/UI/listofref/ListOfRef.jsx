import React from "react";
import cl from "./ListOfRef.module.scss";
import { useParams, useNavigate } from "react-router-dom";

const ListOfRef = ({ list }) => {
  const navigate = useNavigate();
  return (
    <div className={cl["ref-list"]}>
      {list.map((l) => (
        <div
          className={cl["ref-list__link"]}
          key={l[0]}
          onClick={() => {
            navigate(l[0], { replace: false });
          }}
        >
          {l[1]}
        </div>
      ))}
    </div>
  );
};

export default ListOfRef;
