import React, { useEffect, useState, createRef } from "react";
//import RequestService from "../API/RequestService";
import Loader from "../components/UI/loader/Loader";
import LocationCard from "../components/UI/location/Location";
import Search from "../components/UI/search/Search.jsx";
import Select from "../components/UI/select/Select.jsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector } from "react-redux";
import Pagination from "../components/UI/pagination/Pagination";
import { useIterator } from "../hooks/useIterator";
import { useActions } from "../hooks/useActions";
import Modal from "../components/modal/Modal";
import { FaPlus } from "react-icons/fa";

const LocationsEdit = () => {
  const { locations } = useSelector((s) => s.locations);
  const { removeLocation, updateLocation } = useActions();
  const [reverse, setReverse] = useState(1);
  const [lastActionId, setLastActionId] = useState(-1);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("id");
  const [cards, prevFn, nextFn, goToPageFn, numberOfScreens, setPage, page] =
    useIterator(locations, 0, 20, filter, sort, lastActionId, reverse);
  const isLoading = false;
  const error = false;
  const [add, setAdd] = useState(false);

  const saveLo = async (s) => {
    updateLocation(s);
    if (!s["id"]) setLastActionId(-(lastActionId + 1));
  };
  const deleteLo = async (id) => {
    removeLocation(id);
    setLastActionId(id);
    /*const response = await RequestService.delSportsman(id);
    if (response.data.status === "ok") {
      setCards(cards.filter((l) => l.id !== id));
    }*/
  };
  const saveNew = async (e) => {
    const parent = e.target.parentNode.parentNode;
    const saveObj = Array.from(parent.querySelectorAll('[data-save="1"]'))
      .filter(
        (el) => el.type !== "radio" || (el.type === "radio" && el.checked)
      )
      .reduce((p, c) => {
        p[c.dataset["name"]] = c.value;
        return p;
      }, {});
    updateLocation(saveObj);
    setLastActionId(-(lastActionId + 1));
  };

  return (
    <div className="page__content">
      <Modal visible={add} setVisible={setAdd} name="Новая локация">
        <div className="pl-1 pr-1 mb-2 mt-2 w-80 flex flex-col dark:text-slate-800">
          <input
            type="text"
            className="basis-full block m-5 p-1 pl-3 rounded-sm focus:outline-sky-600 focus:border-none"
            placeholder="Название локации"
            data-save="1"
            data-name="name"
          ></input>
          <input
            type="text"
            className="basis-full block m-5 p-1 pl-3 rounded-sm focus:outline-sky-600 focus:border-none"
            placeholder="Описание локации"
            data-save="1"
            data-name="description"
          ></input>
        </div>
        <div
          className="flex flex-row justify-center 
    bg-white relative border-t border-slate-300 bottom-0 left-0 right-0"
        >
          <button
            className="w-full hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-500   
    text-slate-700 basis-full p-3"
            onClick={saveNew}
          >
            Добавить
          </button>
        </div>
      </Modal>
      <div className="page__title title">
        <span className="title__h1">Локации</span>
        <span className="title__description">
          страница редактирования локаций
        </span>
      </div>
      <div className="page__toobar toolbar">
        <div className="toolbar__block">
          <Select
            items={locations}
            action={(value) => {
              if (locations.sortBy === value) {
                setReverse(-1 * reverse);
                locations.reverse = -1 * locations.reverse;
              } else {
                if (locations.vocabulary.some((i) => i[0] === sort)) {
                  locations.sortBy = sort;
                }
                setSort(value);
              }
            }}
            optionsList={locations.vocabulary.map((v) => ({
              value: v[0],
              text: v[1],
            }))}
          />
        </div>
        <div className="toolbar__block">
          <Search
            placeholder="-- search by -- "
            action={(e) => {
              locations.filter = e.target.value.trim().toLowerCase();
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
                className="basis-1/5 bg-teal-600 hover:bg-green-600 transition-colors
          duration-200 m-2 p-2 rounded-md shadow-md shadow-gray-dark dark:shadow-black text-center "
                onClick={() => {
                  setAdd(true);
                }}
              >
                <FaPlus size="2rem" className="text-white ml-auto mr-auto " />
              </button>
            ) : (
              <></>
            )}
            {cards.map((l) => (
              <CSSTransition
                key={l["id"]}
                nodeRef={l["nodeRef"]}
                timeout={500}
                classNames="item"
              >
                <LocationCard
                  key={l.id}
                  location={l}
                  saveLo={saveLo}
                  deleteLo={deleteLo}
                  ref={l["nodeRef"]}
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
export default LocationsEdit;
