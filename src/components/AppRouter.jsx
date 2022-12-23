import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { publicRoutes, privateRoutes } from "../router/";
import { useSelector } from "react-redux";

const AppRouter = () => {
	const { isAuth } = useSelector((state) => state.auth);
	// const terms = useSelector((state) => state.term);
	return isAuth ? (
		<Routes>
			{privateRoutes.map((r, i) => (
				<Route element={<r.element />} path={r.path} key={r.path} />
			))}
			<Route path="/*" element={<Navigate to="/error" replace />} />
		</Routes>
	) : (
		<Routes>
			{publicRoutes.map((r) => (
				<Route element={<r.element />} path={r.path} key={r.path} />
			))}
			<Route path="/*" element={<Navigate to="/error" replace />} />
		</Routes>
	);
};

export default AppRouter;
