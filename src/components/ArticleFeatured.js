import React from 'react'
import Link from '@/components/Link'
import formatDate from 'date-fns/format'
import Richtext from './Richtext'
import BaseImg from './BaseImg'

import './ArticleTile.scss'
import './ArticleFeatured.scss'

const ArticleFeatured = ({ article }) => {
	const { customFields, linkedContent_articleType } = article
	const { title, teaserText, date, media, slug, articleType } = customFields

	const mediaUrl = media?.url
	const mediaImgSources = [
		{
			srcset: [
				{
					src: mediaUrl + '?w=2560',
					descriptor: '2560w',
				},
				{
					src: mediaUrl + '?w=1920',
					descriptor: '1920w',
				},
				{
					src: mediaUrl + '?w=1024',
					descriptor: '1024w',
				},
				{
					src: mediaUrl + '?w=768',
					descriptor: '768w',
				},
				{
					src: mediaUrl + '?w=480',
					descriptor: '480w',
				},
			],
			type: 'image/png',
		},
	]

	return (
		<div className="container-fluid relative overflow-hidden">
			<div className="row -mt-12">
				<div className="mt-12 flex flex-col c-article-featured__col-media md:offset-1 md:col-5" data-aos="fade-up">
					<div className="relative flex-1 flex c-article-featured__col-media-inner flex-row-reverse">
						<div className="absolute top-0 bottom-0 right-full w-screen bg-yellow"></div>
						<div className="flex-auto relative">
							<div className="u-embed__item">
								<BaseImg sources={mediaImgSources}></BaseImg>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-12 md:col-5" style={{ position: 'static' }}>
					<div className="md:pl-13">
						<div className="mb-2 font-normal text-black c-article-tile__meta" data-aos="fade-up">
							{
								(linkedContent_articleType || articleType)
									?.customFields.title
							}{' '}
							| {formatDate(new Date(date), 'd MMM yyyy')}
						</div>
						<h3 className="mb-2.5 normal-case text-black c-article-tile__title" data-aos="fade-up">
							{title}
						</h3>
						<Richtext
							className="mb-5 font-normal c-article-tile__text"
							html={teaserText} data-aos="fade-up"
						/>
						<Link
							to={`/updates/${slug}`}
							className="text-inherit u-link-cover hocus:text-inherit hocus:no-underline"
						>
							<svg
								width="31"
								height="32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								focusable="false"
								className="c-article-tile__arrow"
							>
								<path
									d="M15.669 1l14.154 14.969L15.67 30.937M29.787 15.969H1"
									stroke="currentColor"
									strokeLinecap="round"
								/>
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ArticleFeatured