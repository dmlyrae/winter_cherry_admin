import React, {useEffect}from 'react';
import cl from "./Content.module.scss";
import parse from 'html-react-parser';
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";


const Content = ({post, isLoading}) => {
	const navigate = useNavigate()
	const thUrl = post['thumbnail_url']
	const wHeight = window.innerHeight - 70;
	const date = post.post_date.split(' ')[0].split('-');
	const time = post.post_date.split(' ')[1].split(':');
	const calendar = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 
						'ноября', 'декабря', 'неизвестного месяца'] 
	useEffect(() => {
		//console.log(post.terms)
		const titleInfoEl = document.querySelector('.'+cl['covered-title__info'])
		const titleCoverEl = document.querySelector('.'+cl['covered-title__cover'])
		const titleFilterEl = document.querySelector('.'+cl['covered-title__filter'])
		const titleEl = document.querySelector('.'+cl['covered-title'])
		const infoHeight = titleInfoEl.clientHeight + 80;
		if (wHeight < infoHeight) {
			titleCoverEl.style.height = infoHeight + 'px'
			titleEl.style.height = infoHeight + 'px'
			titleFilterEl.style.height = infoHeight + 'px'
		}
	}, [])
	const termsFiltered = post.terms.filter( t => t.taxonomy !== 'category')
	return (
				<div className={cl['post-container']}>
						<Helmet>
								<title>{post.seo.title || post.post_title}</title>
								<meta
					  name="description"
					  content={post.seo.description || post.post_excerpt}
								/>
								<link rel="canonical" href={post.seo.canonical_url} />
						</Helmet>
					<div className={cl['post-container__title'] + ' ' + cl['covered-title']} style={{height: wHeight}}> 
						<div className={cl['covered-title__cover']} style={{
							backgroundImage: `url(${thUrl})`, 
							backgroundAttachment:'fixed', 
							height: wHeight,
							backgroundSize: (post.has_thumbnail ? `cover` : `center center`),
							opacity: (post.has_thumbnail ? 1 : 0.5),
						}} >
						</div>
						<div className={cl['covered-title__filter']} style={{height: wHeight}}>
						</div>
						<div className={cl['covered-title__info'] + ' ' + cl['title-info'] + ' m-auto'}>
							<div className={cl['title-info__category']}>
								<span className="page-category">
									{post.category.name}
								</span>
							</div>
							<div className={cl['title-info__h1']}>
									<span className="h1">
										{post.post_title}	
									</span>
							</div>
							<div className={cl['title-info__author']}>
								опубликовал: 
								<span className="author" 
									onClick = {(e) => {
										e.preventDefault();
										navigate('/author/' + post.author.user_nicename);
									}} >
									{post.author.user_nicename}
								</span>
							</div>
							<div className={cl['title-info__date']}>
								<span className="date">
									{(time[0] < 7 ? 'ночью ' : time[0] < 11 ? 'утром ' : time[0] < 17 ? 'днём ' : 'вечeром ' ) +
									date[2] + ' ' + calendar[Number(date[1])] + ' ' + date[0] + ' года'}
								</span>
							</div>
							<div className={cl['title-info__excerpt']}>
								<span className="excerpt">
									{post.post_excerpt}	
								</span>
							</div>
						</div>
					</div>
					<div className={cl['post-container__info']}> </div>
					<div className={cl['post-container__body']}>{parse(post.post_content)}</div>
					<div className={cl['post-container__tags'] + (termsFiltered.length > 0 ? ' '  : ' d-none')}>
						{
						termsFiltered.map ( (t,i) => (<a 
						key={i} href={t.slug} className={cl['tag']}
						onClick={e => {
							e.preventDefault()
							navigate('/search/_' + t.name.trim().replaceAll(' ', '_'))
						}}

					>{t.name}</a>) )
						}
					</div>
				</div> 
	)
}

export default Content;
