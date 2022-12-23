import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { BiMap } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { BiTimer } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { BsPatchQuestion } from "react-icons/bs";
import { MdSportsKabaddi } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useActions } from "../../hooks/useActions";
import Modal from "../modal/Modal";

const Navbar = () => {
	const { currentPageNumber, allPages } = useSelector((state) => state.page);
	const { isAuth, userInfo, userSettings } = useSelector((state) => state.auth);
	const { setPage, changeUserSettings, authLogin, authLogout } = useActions();
	const [curPage, setCurPage] = useState(currentPageNumber);
	const [expand, setExpand] = useState(true);
	const [add, setAdd] = useState(false);
	const iconArray = [
		<AiFillHome size="2rem" />,
		<BsFillPersonLinesFill size="2rem" />,
		<FaAddressCard size="2rem" />,
		<BiMap size="2rem" />,
		<MdSportsKabaddi size="2rem" />,
		<BiTimer size="2rem" />,
		<BsPatchQuestion size="2rem" />,
		<BsPatchQuestion size="2rem" />,
		<BsPatchQuestion size="2rem" />,
		<BsPatchQuestion size="2rem" />,
	];
	const tryLogin = (l, p) => {
		const auth = authLogin("", "");
		setAdd(false);
	};
	const tryLogout = (l, p) => {
		const auth = authLogout();
		setAdd(false);
	};
	useEffect(() => {
		const curPage = window.location.toString().split("/")[3] + "/";
		let i = allPages.findIndex((e) => e[0] === curPage);
		if (i < 0) i = 0;
		setExpand(true);
		setPage(i);
		setCurPage(i);
	}, [currentPageNumber]);
	const navigate = useNavigate();
	return (
		<>
			<Modal visible={add} setVisible={setAdd} name="Введите логин и пароль">
				<div className="pl-1 pr-1 mb-2 mt-2 w-80 flex flex-col dark:text-slate-800">
					<input
						type="text"
						className="basis-full block m-5 p-1 pl-3 rounded-sm focus:outline-sky-600 focus:border-none"
						placeholder="login"
						data-save="1"
						data-name="login"
					></input>
					<input
						type="text"
						className="basis-full block m-5 p-1 pl-3 rounded-sm focus:outline-sky-600 focus:border-none"
						placeholder="password"
						data-save="1"
						data-name="password"
					></input>
				</div>
				<div
					className="flex flex-row justify-center 
    bg-white relative border-t border-slate-300 bottom-0 left-0 right-0"
				>
					<button
						className="w-full hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-500   
    text-slate-700 basis-full p-3"
						onClick={tryLogin}
					>
						login
					</button>
				</div>
			</Modal>
			<nav className="fixed top-10 right-0 bg-gray-100 dark:bg-slate-700 shadow-gray-900 dark:shadow-black shadow-md rounded-l-md duration-200 z-50 overflow-hidden">
				<div className="nav">
					<div
						className="basis-full flex flex-row mt-2 mb-2"
						role="group"
						aria-label="..."
					>
						<button
							className="basis-full block p-2"
							data-toggle="tooltip"
							data-placement="left"
							data-container="body"
							title=""
							data-original-title="Expand menu"
							onClick={() => {
								setExpand(!expand);
							}}
						>
							{expand ? (
								<BsFillArrowLeftSquareFill size="2rem" />
							) : (
								<BsFillArrowRightSquareFill size="2rem" />
							)}
						</button>
					</div>
					<div
						className="basis-full md:py-2 relative 
		md:before:absolute md:before:top-0 md:before:left-[13%] md:before:w-3/4 md:before:h-px md:before:bg-slate-400
		md:after:absolute md:after:bottom-0 md:after:left-[13%] md:after:w-3/4 md:after:h-px md:after:bg-slate-400
		"
						role="group"
						aria-label="..."
					>
						{allPages.map((ap, i) => (
							<button
								className={
									(expand ? "hidden md:flex " : "flex ") +
									"basis-full w-full p-2 gap-1 flex-row hover:bg-gray-300 duration-200 transition-all " +
									(curPage === i && "bg-slate-600 dark:bg-teal-600 text-white ")
								}
								data-toggle="tooltip"
								data-placement="left"
								data-container="body"
								title=""
								key={ap[0]}
								data-original-title="Available applications"
								onClick={(e) => {
									setPage(i);
									navigate(ap[0], { replace: false });
								}}
							>
								<span>{iconArray[i]}</span>
								{expand ? (
									""
								) : (
									<span className="mx-4 font-semibold leading-8 duration-200 transition-all">
										{ap[1]}
									</span>
								)}
							</button>
						))}
					</div>
					<div className="mt-1" role="group" aria-label="...">
						<button
							className={
								(expand ? "hidden md:flex " : "flex ") +
								"basis-full w-full p-2 gap-1 flex-row hover:bg-gray-300 duration-200 transition-all "
							}
							data-toggle="tooltip"
							data-placement="left"
							data-container="body"
							title=""
							key={"user-on"}
							data-original-title="Available applications"
							onClick={() => {
								if (isAuth) {
									tryLogout();
								} else {
									setAdd(true);
								}
							}}
						>
							<span>
								{isAuth ? (
									<FaPowerOff size="2rem" />
								) : (
									<BiUserCircle size="2rem" />
								)}
							</span>
							{expand ? (
								""
							) : (
								<span className="mx-4 font-semibold leading-8 duration-200 transition-all">
									{isAuth ? userInfo.username : "log in"}
								</span>
							)}
						</button>
						<button
							className={
								(expand ? "hidden md:flex " : "flex ") +
								"basis-full w-full p-2 gap-1 flex-row hover:bg-gray-300 duration-200 transition-all " +
								(userSettings.darkMode && "bg-slate-600 text-white ")
							}
							data-toggle="tooltip"
							data-placement="left"
							data-container="body"
							title=""
							key={"setting-change"}
							data-original-title="Available applications"
							onClick={() => {
								localStorage["theme"] = userSettings.darkmode
									? "light"
									: "dark";
								changeUserSettings({ darkMode: !userSettings.darkMode });
							}}
						>
							<span>
								{userSettings.darkMode ? (
									<MdDarkMode size="2rem" />
								) : (
									<MdLightMode size="2rem" />
								)}
							</span>
							{expand ? (
								""
							) : (
								<span className="mx-4 font-semibold leading-8 duration-200 transition-all">
									{userSettings.darkMode ? "dark mode" : "light mode"}
								</span>
							)}
						</button>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
