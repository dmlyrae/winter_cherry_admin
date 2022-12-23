import React from "react";
import cl from "./Footer.module.scss";

const Footer = ({ categories }) => {
	return (
		<footer className={cl["site-footer"] + " dark:bg-slate-900"}>
			<div className="container-fluid">
				<div className="row">
					<div className="m-auto col-lg-10 col-md-11 col-12">
						<div className="row"></div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
