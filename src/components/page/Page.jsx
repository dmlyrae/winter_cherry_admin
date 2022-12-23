import React, { useState, useEffect } from "react";
import PostService from "../../API/PostService";
import { useFetching } from "../../hooks/useFetching";
import Loader from "../../components/UI/loader/Loader";
import { useSelector } from "react-redux";
import cl from "./Page.module.scss";

const Page = () => {
	const { terms } = useSelector((state) => state.term);
	const [post, setPost] = useState({});

	useEffect(() => {
		//console.log('postsBook', postsBook)
		if (!terms.hasOwnProperty("terms")) return;
	}, []);

	return <div className="page-content"></div>;
};

export default Page;
