import React from 'react';
import encodeUrl from 'encodeurl'
import Link from '@/components/Link'
import formatDate from 'date-fns/format'
import Richtext from './Richtext'
import BaseImg from './BaseImg'
import './ArticleTile.scss'


const ArticleTile = ({ article, className }) => {
	const { customFields, linkedContent_articleType } = article
	const { title, teaserText, date, media, slug, articleType } = customFields

	const mediaUrl = encodeUrl(media?.url)
	const mediaImgSources = [
		{
			srcset: [
				{
					src: mediaUrl + '?q=80&w=2560',
					descriptor: '2560w',
				},
				{
					src: mediaUrl + '?q=80&w=1920',
					descriptor: '1920w',
				},
				{
					src: mediaUrl + '?q=80&w=1024',
					descriptor: '1024w',
				},
				{
					src: mediaUrl + '?q=80&w=768',
					descriptor: '768w',
				},
				{
					src: mediaUrl + '?q=80&w=480',
					descriptor: '480w',
				},
			],
			type: 'image/png',
		},
	]

	return (
		<div className={`relative c-article-tile ${className}`}>
			<div className="relative mb-12" data-aos="fade-up">
				<div className="relative c-article-tile__media">
					<div className="u-embed__item">
						{!!mediaUrl && <BaseImg src={mediaUrl + '?q=80&w=8'} sources={mediaImgSources} />}
					</div>
				</div>
				<div className="h-2.5 bg-yellow"></div>
			</div>
			<div
				className="mb-2 font-normal text-black c-article-tile__meta"
				data-aos="fade-up"
			>
				{(linkedContent_articleType || articleType)?.customFields?.title}{' '}
				| {formatDate(new Date(date), 'd MMM yyyy')}
			</div>
			<h3
				className="mb-2.5 normal-case text-black font-sans c-article-tile__title"
				data-aos="fade-up"
			>
				{title}
			</h3>
			<Richtext
				className="mb-5 font-normal c-article-tile__text"
				html={teaserText}
				data-aos="fade-up"
			/>
			<Link
				to={`/updates/${slug}`}
				className="text-inherit u-link-cover hocus:text-yellow hocus:no-underline c-article-tile__link"
			>
				<svg
					width="31"
					height="32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					focusable="false"
					className="c-article-tile__arrow"
					data-aos="fade-up"
				>
					<path
						d="M15.669 1l14.154 14.969L15.67 30.937M29.787 15.969H1"
						stroke="currentColor"
						strokeLinecap="round"
					/>
				</svg>
			</Link>
		</div>
	)
}

export default ArticleTile
