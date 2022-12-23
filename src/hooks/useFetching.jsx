import { useState } from "react";

export const useFetching = (callback) => {
	const [isPageLoading, setIsPageLoading] = useState(false);
	const [error, setError] = useState("");

	const fetching = async (...args) => {
		try {
			setIsPageLoading(true);
			await callback(...args);
		} catch (e) {
			setError(e.message);
		} finally {
			setIsPageLoading(false);
		}
	};
	return [fetching, isPageLoading, error];
};
