import React, {useState, createContext, useContext} from 'react';

const PostsBookContext = createContext({})
export const usePostsBook = () => useContext(PostsBookContext)
export const PostsBookProvider = ({children}) => {
	const [postsBook, setPostsBook] = useState({})
	const appendPostsBook = (ps) => {
		const df = {...postsBook, ...ps.reduce( (p, c) => {p[c.post_name] = c.ID; return p; }, {})}
		setPostsBook(df)
	}
	const [categoryId, setCategoryId] = useState(0)
	return (
		<PostsBookContext.Provider value = {{postsBook, appendPostsBook, categoryId, setCategoryId}}>
			{children}
		</PostsBookContext.Provider>
		)
}
