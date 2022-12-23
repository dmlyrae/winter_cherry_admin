import React, { useState } from "react";
import cl from "./Modal.module.scss";

const Modal = ({ children, name, visible, setVisible }) => {
	const rootCl = [cl["modal__layer"]];
	visible && rootCl.push(cl["modal__layer_active"]);
	return (
		<div className={rootCl.join(" ")} onClick={() => setVisible(false)}>
			<div
				className={
					cl["modal__window"] +
					" " +
					cl["window"] +
					" bg-white dark:bg-slate-700 "
				}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className={cl.window__title}>
					<span className={cl.h1}>{name}</span>
					<span
						className={cl["close-button"]}
						onClick={() => setVisible(false)}
					></span>
				</div>
				<div className={cl.window__body}>{children}</div>
				<div className={cl.window__footer}></div>
			</div>
		</div>
	);
};

export default Modal;
