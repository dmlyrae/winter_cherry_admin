import React, { useState, createRef } from "react";
//import RequestService from "../API/RequestService";
import Loader from "../components/UI/loader/Loader";
import RequestCard from "../components/UI/request/RequestCard";
import Search from "../components/UI/search/Search.jsx";
import Select from "../components/UI/select/Select.jsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector } from "react-redux";
import Pagination from "../components/UI/pagination/Pagination";
import { useIterator } from "../hooks/useIterator";
import { useActions } from "../hooks/useActions";
import Modal from "../components/modal/Modal";
import { FaPlus } from "react-icons/fa";

const RequestEdit = () => {
  const { requests } = useSelector((s) => s.requests);
  const { sportsmen } = useSelector((s) => s.sportsmen);
  const { locations } = useSelector((s) => s.locations);
  const { updateRequest, removeRequest, updateEvent } = useActions();
  const [reverse, setReverse] = useState(1);
  const [lastActionId, setLastActionId] = useState(-1);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("id");
  const [cards, prevFn, nextFn, goToPageFn, numberOfScreens, setPage, page] =
    useIterator(requests, 0, 10, filter, sort, lastActionId, reverse);
  const isLoading = false;
  const error = false;
  const [add, setAdd] = useState(false);
  const [newSportsmen, setNewSportsmen] = useState([]);

  const approveRq = async (id) => {
    const rqNew = Object.assign(requests[id]);
    rqNew["approve"] = 1;
    updateRequest(rqNew);
    setLastActionId(id);
  };
  const deleteRq = async (id) => {
    removeRequest(id);
    setLastActionId(id);
  };
  const saveNew = async (e) => {
    const parent = e.target.parentNode.parentNode;
    const saveObj = Array.from(
      parent.querySelectorAll('[data-save="4"]')
    ).reduce((p, c) => {
      p[c.dataset["name"]] = c.value;
      return p;
    }, {});
    saveObj.sportsmen = [...newSportsmen];
    saveObj.approve = 0;
    saveObj.trashed = 0;
    saveObj.year = 2023;
    saveObj.date = new Date();
    saveObj.ref = createRef();
    saveObj.sum = 0;
    updateRequest(saveObj);
    updateEvent({
      time: Date.now(),
      message: "Зарегистрировалась команда «" + saveObj["command-name"] + "».",
    });
    setLastActionId(-(lastActionId + 1));
    setNewSportsmen([]);
    //console.log(requests);
  };

  return (
    <div className="page__content">
      {error || <div className="error">{error}</div>}
      <Modal visible={add} setVisible={setAdd} name="Новая заявка">
        <div className="pl-1 pr-1 mb-2 mt-2 w-80 flex flex-col dark:text-slate-800">
          <input
            type="text"
            className="basis-full block m-5 p-1 pl-3 rounded-sm focus:outline-sky-600 focus:border-none"
            placeholder="Название команды"
            data-save="4"
            data-name="command-name"
          ></input>
          <select
            type="text"
            className="basis-full block m-5 p-1 pl-3 rounded-sm focus:outline-sky-600 focus:border-none"
            data-save="4"
            data-name="command-address"
          >
            {locations.ids.map((l) => (
              <option value={locations[l]["id"]} key={locations[l]["id"]}>
                {locations[l]["name"]}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="basis-full block m-5 p-1 pl-3 rounded-sm focus:outline-sky-600 focus:border-none"
            placeholder="Телефон"
            data-save="4"
            data-name="command-phone"
          ></input>
          <input
            type="text"
            className="basis-full block m-5 p-1 pl-3 rounded-sm focus:outline-sky-600 focus:border-none"
            placeholder="Представитель"
            data-save="4"
            data-name="command-fio"
          ></input>
          <div className="">
            {newSportsmen.map((ns) => (
              <div className="flex flex-row gap-1">
                <div className="basis-2/3" data-save="2" data-id={ns["id"]}>
                  {sportsmen[+ns["id"]]["name"]}
                </div>
                <button
                  className="basis-1/4 icon-button icon-button_small deny"
                  data-icon="L"
                  title="Remove"
                  onClick={(e) => {
                    const parent = e.target.parentElement.parentElement;
                    const id =
                      parent.querySelector('[data-save="2"]').dataset.id;
                    setNewSportsmen(newSportsmen.filter((s) => s["id"] !== id));
                  }}
                >
                  {" "}
                </button>
              </div>
            ))}
          </div>
          <div className="my-1 border rounded-sm">
            <div
              className="flex flex-row text-sm 
						text-center pr-2 justify-center align-middle"
            >
              <div className="basis-1/4 p-1">
                <select
                  type="text"
                  className="basis-full block text-sm"
                  data-save="1"
                  data-name="member_distance"
                >
                  <option value="2" defaultValue>
                    2 класс
                  </option>
                  <option value="3">3 класс</option>
                  <option value="4">4 класс</option>
                </select>
              </div>
              <div className="basis-1/4 p-1">
                <legend>Личная</legend>
                <input
                  type="checkbox"
                  value="0"
                  data-save="1"
                  data-name="member_personal"
                />
              </div>
              <div className="basis-1/4 p-1">
                <legend>Группа</legend>
                <input
                  type="checkbox"
                  value="0"
                  data-save="1"
                  data-name="member_group"
                />
              </div>
              <div className="basis-1/4 p-1">
                <legend>Команда</legend>
                <input
                  type="checkbox"
                  value="0"
                  data-save="1"
                  data-name="member_category"
                />
              </div>
            </div>
            <div
              className="flex flex-row text-sm 
						text-center pr-2 justify-center align-middle"
            >
              <div className="basis-3/4 p-1">
                <select
                  type="text"
                  className="basis-full block my-1"
                  data-save="1"
                  data-name="id"
                >
                  {sportsmen.ids.map((s) => (
                    <option value={sportsmen[s]["id"]} key={sportsmen[s]["id"]}>
                      {sportsmen[s]["name"]}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="basis-1/4 p-1 text-lg leading-3 cursor-pointer icon-button icon-button_small allow"
                data-icon="O"
                onClick={(e) => {
                  const parent = e.target.parentElement.parentElement;
                  const addObj = Array.from(
                    parent.querySelectorAll('[data-save="1"]')
                  ).reduce((obj, el) => {
                    obj[el.dataset.name] = el.value;
                    return obj;
                  }, {});
                  setNewSportsmen([...newSportsmen, addObj]);
                }}
              ></button>
            </div>
          </div>
          <div
            className="flex flex-row justify-center 
    bg-white relative border-t border-slate-300 bottom-0 left-0 right-0"
          >
            <button
              className="w-full hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-500 text-slate-700 basis-full p-3"
              onClick={saveNew}
            >
              Добавить
            </button>
          </div>
        </div>
      </Modal>
      <div className="page__title title">
        <span className="title__h1">Заявки</span>
        <span className="title__description">
          страница редактирования заявок
        </span>
      </div>
      <div className="page__toobar toolbar">
        <div className="toolbar__block">
          <Select
            items={requests}
            action={(value) => {
              if (requests.sortBy === value) {
                setReverse(-1 * reverse);
                requests.reverse = -1 * requests.reverse;
              } else {
                if (requests.vocabulary.some((i) => i[0] === sort)) {
                  requests.sortBy = sort;
                }
                setSort(value);
              }
            }}
            optionsList={requests.vocabulary.map((v) => ({
              value: v[0],
              text: v[1],
            }))}
          />
        </div>
        <div className="toolbar__block">
          <Search
            placeholder="-- search by -- "
            action={(e) => {
              requests.filter = e.target.value.trim().toLowerCase();
              setFilter(e.target.value.trim().toLowerCase());
            }}
          />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TransitionGroup className="flex flex-row flex-wrap gap-1 justify-center">
            {page === 0 ? (
              <button
                className="basis-1/3 bg-teal-600 hover:bg-green-600 transition-colors
          duration-200 m-2 p-2 rounded-md shadow-sm shadow-gray-dark dark:shadow-black text-center "
                onClick={() => {
                  setAdd(true);
                }}
              >
                <FaPlus size="2rem" className="text-white ml-auto mr-auto " />
              </button>
            ) : (
              <></>
            )}
            {cards.map((card) => (
              <CSSTransition
                key={card["id"]}
                nodeRef={card["nodeRef"]}
                timeout={500}
                classNames="item"
              >
                <RequestCard
                  request={card}
                  approveRq={approveRq}
                  sportsmen={Object.keys(card.sportsmen).reduce((o, k) => {
                    o[card.sportsmen[k]["id"]] =
                      sportsmen[card.sportsmen[k]["id"]];
                    return o;
                  }, {})}
                  location={locations[card["command-address"]]}
                  deleteRq={deleteRq}
                  ref={card["nodeRef"]}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
          <Pagination
            numberOfScreens={numberOfScreens}
            nextFn={nextFn}
            prevFn={prevFn}
            goToPageFn={goToPageFn}
            setPage={setPage}
            page={page}
            sort={sort}
            filter={filter}
          />
        </>
      )}
    </div>
  );
};

export default RequestEdit;
