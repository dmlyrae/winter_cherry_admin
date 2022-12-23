import {useMemo} from 'react';
export const useSortedPosts = (posts, sort) => {
	const vocabulary = {
		'sortByName': 'post_title',
		'sortByBody': 'post_content',
		'sortById': 'ID',
	}
	const sortedPosts = useMemo ( () => {
		if (sort) {
			if (sort === 'sortById') return [...posts].sort( (a, b) => a[vocabulary[sort]] > b[vocabulary[sort]] ); 
			return [...posts].sort( (a, b) => a[vocabulary[sort]].localeCompare(b[vocabulary[sort]])); 
		} else {
			return posts;
		}
	}, [sort, posts])
	return sortedPosts;
}

export const usePosts = (posts, sort, query) => {
	const sortedPosts = useSortedPosts(posts, sort);
	const sortedAndSearchedPosts = useMemo ( () => {
		return sortedPosts.filter(p => p.post_title.toLowerCase().includes(query.toLowerCase()) || p.post_content.toLowerCase().includes(query.toLowerCase()))
	}, [query, sortedPosts])
	return sortedAndSearchedPosts;
}
