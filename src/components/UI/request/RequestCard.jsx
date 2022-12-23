import React, { useState } from "react";
import cl from "./RequestCard.module.scss";

const RequestCard = ({ request, approveRq, deleteRq, sportsmen, location }) => {
  return (
    <div
      className={cl["card"] + " bg-white dark:bg-slate-700 dark:shadow-black "}
    >
      <div
        className={cl["title-block"] + " " + cl["card__block_title"]}
        data-save="1"
      >
        <div className={cl["title-block__command-name"]}>
          <span>{request["id"] + ". " + request["command-name"]}</span>
        </div>
        <div className={cl["title-block__command-info"] + " " + cl["info"]}>
          <div className={cl["info__address"]}>
            <span>{location["name"]}</span>
          </div>
          <div className={cl["info__fio"]}>
            <span>{request["command-fio"]}</span>
          </div>
          <div className={cl["info__phone"]}>
            <span>{request["command-phone"]}</span>
          </div>
        </div>
      </div>
      <div className={cl["card__block_sportsmen"]}>
        {Object.keys(request["sportsmen"]).map((k) => {
          return (
            <div
              key={request["sportsmen"][k]["id"]}
              className={cl["sportsmen"]}
            >
              <div className={cl["id"]}>
                {sportsmen[request["sportsmen"][k]["id"]]["name"]}
              </div>
              <div className={cl["sportsmen-details"]}>
                <span>
                  {request.sportsmen[k]["member_distance"] + " класс"}
                </span>
                {request.sportsmen[k]["member_personal"] === 1 && (
                  <span>личка</span>
                )}
                {request.sportsmen[k]["member_category"] !== "нет" && (
                  <span>категория</span>
                )}
                {request.sportsmen[k]["member_group"] !== "нет" && (
                  <span>группа</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className={cl["card__block_buttons"]}>
        {request["approve"] === 0 ? (
          <button
            className={cl["card-button"]}
            onClick={() => {
              approveRq(request["id"]);
            }}
            data-icon="E"
            title="Aprove"
          ></button>
        ) : (
          <button
            className={cl["card-button_approved"]}
            data-icon="t"
            title="Aprove"
          ></button>
        )}
        <button
          className={cl["card-button"]}
          onClick={() => {
            deleteRq(request["id"]);
          }}
          data-icon="L"
          title="Remove"
        ></button>
      </div>
    </div>
  );
};

export default RequestCard;
