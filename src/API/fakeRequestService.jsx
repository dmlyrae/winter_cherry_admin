import axios from "axios";
import { useSelector } from "react-redux";
import { faker } from "@faker-js/faker";

export const authTry = function(token) {
  if (token) {
    return { isAuth: true, JWT: faker.datatype.uuid(), error: false };
  }
  return { isAuth: false, JWT: "", error: false };
};

export const checkNonce = function(nonce) {
  if (nonce) return nonce;
  const e = document.getElementById("_wpnonce");
  if (e) return e.value;
  return "x";
};

export function getRequests(page, nonce, auth) {
  const { requests } = useSelector((s) => s.requests);
}
export function getSportsmen(page, nonce, auth) { }
export function saveSportsman(sportsman, nonce, auth) { }
export function delSportsman(id, nonce, auth) { }
export function saveLocation(location, nonce, auth) { }
export function getLocations(location, nonce, auth) { }
export function delLocation(id, nonce, auth) { }
