import React, { useState } from "react";
import classes from "./MyModal.module.css";

const Modal = ({ children, name, visible, setVisible }) => {
	const rootClasses = [classes.modalBlock];
	if (visible) rootClasses.push(classes.active);
	return (
		<div className={rootClasses.join(" ")} onClick={(e) => setVisible(false)}>
			<div
				className={classes.modalBlockContent}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={classes.modalBlock__h1}>
					<span className={[classes.modalBlock__h1, classes.h1].join(" ")}>
						{name}
					</span>
					<span
						className={[classes.modalBlock__h1, classes.closeButton].join(" ")}
						onClick={() => setVisible(false)}
					></span>
				</div>
				<div className={classes.modalBlock__body}>{children}</div>
				<div className={classes.modalBlock__footer}></div>
			</div>
		</div>
	);
};

export default Modal;
