import React from 'react';
import { Link } from 'gatsby'
import formatDate from 'date-fns/format'
import Richtext from './Richtext'
import BaseImg from './BaseImg'
import './ArticleTile.scss'


const ArticleTile = ({ article }) => {
	console.log(article)
	const { customFields, linkedContent_articleType } = article
	const { title, teaserText, date, media, slug } = customFields

	const mediaImgSources = [
		{
			srcset: [
				{
					src: media.url + '?w=2560',
					descriptor: '2560w',
				},
				{
					src: media.url + '?w=1920',
					descriptor: '1920w',
				},
				{
					src: media.url + '?w=1024',
					descriptor: '1024w',
				},
				{
					src: media.url + '?w=768',
					descriptor: '768w',
				},
				{
					src: media.url + '?w=480',
					descriptor: '480w',
				},
			],
			type: 'image/png',
		},
	]


	return (
		<div className="relative c-article-tile">
			<div className="relative mb-12">
				<div className="relative c-article-tile__media">
					<div className="u-embed__item">
						<BaseImg sources={mediaImgSources} />
					</div>
				</div>
				<div className="h-2.5 bg-yellow"></div>
			</div>
			<div className="mb-2 font-normal text-black c-article-tile__meta">
				{linkedContent_articleType.customFields.title} | {formatDate(new Date(date), 'd MMM yyyy')}
			</div>
			<h3 className="mb-2.5 normal-case text-black c-article-tile__title">
				<Link to={`/updates/${slug}`} className="u-link-cover">
					{title}
				</Link>
			</h3>
			<Richtext className="mb-5 c-article-tile__text" html={teaserText} />
			<svg
				width="31"
				height="32"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M15.669 1l14.154 14.969L15.67 30.937M29.787 15.969H1"
					stroke="currentColor"
					strokeLinecap="round"
				/>
			</svg>
		</div>
	)
}

export default ArticleTile
