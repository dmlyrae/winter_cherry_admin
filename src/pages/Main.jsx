import React, { useEffect } from "react";
import H1 from "../components/UI/h1/H1";
import EventsList from "../components/events/EventsList";
import Statistics from "../components/statistics/Statistics";

const Main = () => {
	const now = new Date();

	return (
		<div className="page__content pt-4">
			<H1
				h1={"Зимняя Вишня " + now.getFullYear()}
				descr={"общая информация на " + now.getDay() + "." + now.getMonth()}
			/>
			<EventsList />
			<Statistics />
		</div>
	);
};

export default Main;
