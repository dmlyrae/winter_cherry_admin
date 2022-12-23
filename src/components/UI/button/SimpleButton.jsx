import React from "react";

const SimpleButton = ({ children, action, addionalStyle }) => {
	return (
		<button
			type="button"
			className={
				" mx-px md:mx-1 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 bg-teal-600 text-white font-medium " +
				"inline-block bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-white font-medium text-xs leading-tight uppercase rounded-md shadow-md dark:shadow-black hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out " +
				addionalStyle
			}
			onClick={action}
		>
			{children}
		</button>
	);
};

export default SimpleButton;
