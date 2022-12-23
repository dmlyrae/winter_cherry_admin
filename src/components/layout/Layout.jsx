import React, { useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import Loader from "../UI/loader/Loader";

const Layout = ({ children }) => {
  String.prototype.capitalize = function() {
    return this.split(" ")
      .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  };
  const {
    fetchSportsmen,
    fetchContests,
    authNonce,
    setPage,
    fetchLocations,
    fetchRequests,
    fetchEvents,
    changeUserSettings,
  } = useActions();
  const { sportsmen } = useSelector((state) => state.sportsmen);
  const { userSettings } = useSelector((state) => state.auth);
  const { locations } = useSelector((state) => state.locations);
  const { requests } = useSelector((state) => state.requests);
  const { contests, error, loading } = useSelector((state) => state.contests);
  useEffect(() => {
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const userTheme =
      (localStorage["theme"] || (localStorage["theme"] = "light"),
        localStorage["theme"]);
    if (userTheme === "dark" || (!userTheme && systemTheme))
      changeUserSettings({ darkMode: true });
    fetchSportsmen();
    authNonce();
    setPage(0);
    fetchLocations();
    fetchEvents();
  }, []);
  useEffect(() => {
    if (sportsmen.length === 0) return;
    if (locations.length === 0) return;
    fetchRequests(sportsmen, locations);
  }, [sportsmen, locations]);
  useEffect(() => {
    // if (!requests) return;
    if (requests.length === 0) return;
    if (sportsmen.length === 0) return;
    fetchContests(requests, sportsmen);
  }, [requests, sportsmen]);
  return (
    <div className={userSettings.darkMode ? "dark" : "ligth"}>
      <div className=" mx-auto main ">
        <Navbar />
        {error && <div className="error">{error}</div>}
        {loading ? <Loader /> : <>{children}</>}
        <Footer />
      </div>
    </div>
  );
};
export default Layout;
