import $ from 'jquery'
import React, { useRef, useEffect } from 'react';
import { graphql, useStaticQuery } from "gatsby";
import formatDate from 'date-fns/format'

import Richtext from '@/components/Richtext'
import ArticleTile from '@/components/ArticleTile'
import CommonContainer from '@/components/CommonContainer'
import ContentHero from '@/modules/ContentHero'

import './ArticleDetail.scss'
import './ArticleListing.scss'

const iconStyle = { width: 6.5 * 4 };

const ArticleDetail = ({ dynamicPageItem }) => {
	const { allAgilityArticle } = useStaticQuery(
		graphql`
			query AllAgilityArticleQuery {
				allAgilityArticle {
					nodes {
						contentID
						customFields {
							title
							slug
							isFeatured
							teaserText
							details
							date
							media {
								url
							}
						}
						linkedContent_articleType {
							customFields {
								title
							}
						}
						linkedContent_authors {
							id
							customFields {
								name
								link {
									href
									target
									text
								}
							}
							properties {
								itemOrder
							}
						}
					}
				}
			}
		`
	)

	const article = allAgilityArticle.nodes.find(
		node =>
			node.contentID ===
			dynamicPageItem.contentID
	)

	const { relatedArticles } = dynamicPageItem.customFields
	const { title, media, details, date } = article.customFields
	const richtextRef = useRef(null)

	const {
		linkedContent_authors: authors,
		linkedContent_articleType,
	} = article

	const heroItem = {
		customFields: {
			title,
			isTitleYellow: true,
			isUseYellowHorizontalBar: true,
			media
		}
	};

	useEffect(() => {
		$(richtextRef.current).find('img').each(function() {
			const $img = $(this).addClass('w-full');
			$img
				.wrap('<figure class="c-article-detail__text-figure"></figure>')
				.after(`<caption class="block mt-5 p-0 text-grey-light-medium c-article-detail__text-figure-caption">${$img.attr('alt')}</caption>`)
				.wrap('<div class="relative c-article-detail__text-figure-inner"></div>')
		})

		if(window.addthis) {
			window.addthis.init()
			window.addthis.toolbox('.addthis_toolbox')
		}
	})

	const renderAuthors = () => {
		let authorsEl = [];
		authors.forEach((author, index) => {
			if(index > 0) {
				authorsEl.push(' and ')
			}

			const { name, link } = author.customFields
			const el = (link) ?
				(
					<a key={link.href} className="text-inherit hocus:text-inherit underline"
						href={link.href}
						target={link.target}
					>{link.text}</a>
				) : (
					<span key={name}>{name}</span>
				)
			authorsEl.push(el)
		})
		return authorsEl;
	}


	const renderMeta = () => (
		<div className="md:ml-auto md:max-w-45">
			<div
				className="border-t border-b py-3.5 mb-6.5"
				style={{ borderColor: '#1e1e1e' }}
			>
				<div className="c-article-detail__meta">
					{linkedContent_articleType?.customFields.title} |{' '}
					{formatDate(new Date(date), 'd MMM yyyy')}
				</div>
				{authors && authors.length && (
					<div className="mt-6 font-bold c-article-detail__author">
						By {renderAuthors()}
					</div>
				)}
			</div>
			<div className="mt-6 flex space-x-3.5 addthis_toolbox">
				{/* Facebook */}
				<a
					href="#"
					className="text-inherit hocus:text-inherit hocus:no-underline bg-grey-light flex-shrink-0 h-6.5 rounded-full flex justify-center items-center addthis_button_facebook"
					aria-label="Facebook"
					style={iconStyle}
				>
					<svg
						width="8"
						height="16"
						viewBox="0 0 8 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						focusable="false"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M5.39961 5.0434V3.8614C5.39961 3.2854 5.78361 3.1504 6.05261 3.1504H7.71261V0.618398L5.42761 0.608398C2.89161 0.608398 2.31561 2.4974 2.31561 3.7074V5.0434H0.849609V8.0014H2.32861V15.3944H5.28561V8.0014H7.48061L7.74961 5.0434H5.39961Z"
							fill="currentColor"
						/>
					</svg>
				</a>
				{/* LinkedIn */}
				<a
					href="#"
					className="text-inherit hocus:text-inherit hocus:no-underline bg-grey-light flex-shrink-0 h-6.5 rounded-full flex justify-center items-center addthis_button_linkedin"
					aria-label="Linkedin"
					style={iconStyle}
				>
					<svg
						width="26"
						height="25"
						viewBox="0 0 26 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						focusable="false"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M7.4873 17.6965H10.3773V9.4375H7.4873V17.6965Z"
							fill="currentColor"
						/>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M8.93256 5.30762C8.02756 5.30762 7.31856 6.13962 7.52256 7.07662C7.64156 7.62062 8.08556 8.05862 8.63156 8.16762C9.56256 8.35462 10.3776 7.64962 10.3776 6.75262C10.3776 5.95562 9.73156 5.30762 8.93256 5.30762Z"
							fill="currentColor"
						/>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M19.8743 11.9735C19.6803 10.4165 18.9013 9.43652 16.7973 9.43652C15.3033 9.43652 14.7103 9.66952 14.3673 10.3215V9.43652H12.0283V17.6955H14.4353V13.3715C14.4353 12.2925 14.6403 11.4775 15.9743 11.4775C17.2893 11.4775 17.3953 12.4805 17.3953 13.4415V17.6955H19.8743C19.8743 17.6955 19.9203 12.3375 19.8743 11.9735Z"
							fill="currentColor"
						/>
					</svg>
				</a>
				{/* Twitter */}
				<a
					href="#"
					className="text-inherit hocus:text-inherit hocus:no-underline bg-grey-light flex-shrink-0 h-6.5 rounded-full flex justify-center items-center addthis_button_twitter"
					aria-label="Twitter"
					style={iconStyle}
				>
					<svg
						width="16"
						height="13"
						viewBox="0 0 16 13"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						focusable="false"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M15.1751 2.25402C14.6751 2.45702 14.1401 2.59502 13.5821 2.66102C14.1731 2.31302 14.6341 1.77302 14.8751 1.12702C14.8901 1.08602 14.8451 1.04902 14.8071 1.07002C14.2501 1.38102 13.6391 1.60902 12.9891 1.73402C12.4371 1.15402 11.6481 0.791016 10.7741 0.791016C9.10111 0.791016 7.74111 2.12802 7.74111 3.77702C7.74111 4.01102 7.76811 4.23902 7.81911 4.45802C5.30711 4.33302 3.07811 3.15202 1.58211 1.35602C1.57411 1.34702 1.56011 1.34802 1.55411 1.35802C1.30311 1.79502 1.15611 2.30102 1.15611 2.83902C1.15611 3.85102 1.66911 4.74702 2.45311 5.28802C2.46811 5.29802 2.46011 5.32202 2.44111 5.32202C1.97811 5.29702 1.54111 5.17002 1.15611 4.96402C1.14511 4.95802 1.13211 4.96502 1.13311 4.97802C1.14111 5.10902 1.18311 5.69402 1.33811 6.07002C1.72011 7.00202 2.54411 7.71502 3.56711 7.91702C3.31111 7.98402 3.04211 8.02302 2.76611 8.02302C2.58111 8.02302 2.40011 8.00502 2.22211 7.97202C2.20911 7.97002 2.19811 7.98202 2.20211 7.99402C2.59411 9.15002 3.68211 9.99602 4.97611 10.039C4.99411 10.04 5.00111 10.061 4.98711 10.072C3.95511 10.855 2.66511 11.32 1.26011 11.32C1.01411 11.32 0.776109 11.306 0.537109 11.279C1.88011 12.126 3.47411 12.62 5.18711 12.62C7.54711 12.62 9.45511 11.806 10.8711 10.568C12.2991 9.31902 13.2271 7.63802 13.6131 5.92602C13.7491 5.32402 13.8201 4.71702 13.8201 4.12402C13.8201 3.99502 13.8171 3.86602 13.8101 3.73802C14.3591 3.34702 14.8411 2.86802 15.2311 2.32402C15.2581 2.28602 15.2181 2.23602 15.1751 2.25402Z"
							fill="currentColor"
						/>
					</svg>
				</a>
			</div>
		</div>
	)

    return (
		<article>
			<ContentHero item={heroItem} />

			<div className="mt-30 container-fluid" data-aos="fade-up">
				<div className="row">
					<div className="col-12 md:hidden mb-12">{renderMeta()}</div>
					<div ref={richtextRef} className="md:offset-2 md:col-6">
						<Richtext
							className="font-normal c-article-detail__text"
							html={details}
						/>
					</div>
					<div className="md:col-2 hidden md:block">
						{renderMeta()}
					</div>
				</div>
			</div>

			{!!relatedArticles && relatedArticles.length > 0 && (
				<div className="bg-grey-light-medium py-23 mt-30 c-article-detail__related" data-aos="fade-up">
					<CommonContainer>
						<h2 className="text-center c-article-detail__related-title text-yellow">
							More from us
						</h2>
						<hr className="w-7.5 border-b border-yellow mx-auto my-11" />
						<div className="overflow-hidden">
							<div className="row -mt-23 c-articlelisting__row">
								{relatedArticles.map(relatedArticle => {
									return (
										<div
											key={`relatedarticle-${relatedArticle.contentID}`}
											className="md:col-4 mt-23 c-articlelisting__col"
										>
											<ArticleTile
												className="text-white"
												article={relatedArticle}
											></ArticleTile>
										</div>
									)
								})}
							</div>
						</div>
					</CommonContainer>
				</div>
			)}
		</article>
	)
}
export default ArticleDetail;
