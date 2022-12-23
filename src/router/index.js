import Error from "../pages/Error";
import RequestEdit from "../pages/RequestEdit";
import Login from "../pages/Login";
import Main from "../pages/Main";
import SportsmenEdit from "../pages/SportsmenEdit";
import LocationsEdit from "../pages/LocationsEdit";
import Contests from "../pages/Contests";
import TimerPage from "../pages/Timer";
import Fonts from "../pages/Fonts";

//export const privateRoutes = [{ path: "/login", element: Login }];
export const privateRoutes = [
	{ path: "/error", element: Error },
	{ path: "/fonts", element: Fonts },
	{ path: "/login", element: Login },
	{ path: "/", element: () => <Main /> },
	{ path: "/sportsmen", element: () => <SportsmenEdit /> },
	{ path: "/locations", element: () => <LocationsEdit /> },
	{ path: "/requests", element: () => <RequestEdit /> },
	{ path: "/timer/:contest/:command", element: () => <TimerPage /> },
	{ path: "/timer/:contest", element: () => <TimerPage /> },
	{ path: "/timer", element: () => <TimerPage /> },
	{ path: "/contests/", element: () => <Contests /> },
];
export const publicRoutes = [
	{ path: "/error", element: Error },
	{ path: "/", element: () => <Main /> },
	{ path: "/sportsmen", element: () => <SportsmenEdit /> },
	{ path: "/locations", element: () => <LocationsEdit /> },
	{ path: "/requests", element: () => <RequestEdit /> },
	{ path: "/timer/:contest/:command", element: () => <TimerPage /> },
	{ path: "/timer/:contest", element: () => <TimerPage /> },
	{ path: "/timer", element: () => <TimerPage /> },
	{ path: "/contests/", element: () => <Contests /> },
];
