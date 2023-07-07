import React, { useState } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import compareDesc from 'date-fns/compareDesc'
import CommonContainer from '@/components/CommonContainer'
import ArticleTile from '@/components/ArticleTile'
import ArticleFeatured from '@/components/ArticleFeatured'
import LinkButton from '@/components/LinkButton'
import toBool from '@/utils/convertBoolStrToBool'

import './ArticleListing.scss'

const pageSize = 6

export default props => {
	return (
		<StaticQuery
			query={graphql`
				query AgilityArticlesQuery {
					allAgilityArticle(
						sort: { fields: customFields___date, order: DESC }
					) {
						nodes {
							id
							customFields {
								articleType {
									contentid
								}
								date
								isFeatured
								teaserText
								title
								media {
									url
								}
							}
							sitemapNode {
								pagePath
							}
							linkedContent_articleType {
								customFields {
									title
								}
							}
						}
					}
				}
			`}
			render={queryData => {
				return (
					<ArticleListing
						allItems={queryData.allAgilityArticle.nodes}
						{...props}
					/>
				)
			}}
		/>
	)
}

/**
 *
 * Notes:
 * 1. If isFeaturedSectionShown == true and isShowAllArticles == true, use allItems - excluding isFeatured
 * 2. If isFeaturedSectionShown == true and isShowAllArticles == false, use item.customFields.list - excluding isFeatured
 * 3. If isFeaturedSectionShown == false and isShowAllArticles == true, use allItems including isFeatured
 * 4. If isFeaturedSectionShown == false and isShowAllArticles == false, use item.customFields.list
 */

const ArticleListing = ({ item, allItems }) => {
	const {
		title,
		backgroundColor,
		isShowAllArticles,
		isFeaturedSectionShown,
		topArticlesCount,
		list,
	} = item.customFields

	const newsList = toBool(isShowAllArticles) ? allItems.slice(0, topArticlesCount || Infinity) : list

	const [page, setPage] = useState(1)

	const handleClickLoadMore = () => {
		setPage(page + 1)
	}

	const sortNewsByDateDesc = (a, b) =>
		compareDesc(
			new Date(a.customFields.date),
			new Date(b.customFields.date)
		)

	const featuredNews = newsList
		.sort(sortNewsByDateDesc)
		.find(news => toBool(news.customFields.isFeatured))

	const filteredNewsList = newsList.filter(listItem => {
		return toBool(isFeaturedSectionShown)
			? listItem.id !== featuredNews?.id
			: true
	})

	const pageCount = Math.ceil(filteredNewsList.length / pageSize)

	const pagedNewsList = filteredNewsList
		.slice(0, page * pageSize)
		.sort(sortNewsByDateDesc)

	return (
		<div className="c-articlelisting">
			{
				isFeaturedSectionShown && (
					<div className="mb-25" data-aos="fade-up">
						<ArticleFeatured article={featuredNews}></ArticleFeatured>
					</div>
				)
			}

			{/* purgecss: .bg-grey-light, .bg-grey-light-medium  */}
			<div className={`bg-${backgroundColor} py-23`}>
				<CommonContainer>
					{!!title && (
						<h2 className="text-center c-article-detail__related-title text-yellow">
							{title}
						</h2>
					)}

					<div className="overflow-hidden">
						<div className="row -mt-23 c-articlelisting__row">
							{pagedNewsList.map(listItem => {
								return (
									<div
										key={`article-${listItem?.contentID ||
											listItem?.id}`}
										className="md:col-4 mt-23 c-articlelisting__col"
										data-aos="fade-up"
									>
										<ArticleTile
											article={listItem}
										></ArticleTile>
									</div>
								)
							})}
						</div>
					</div>

					{page < pageCount && (
						<div className="text-center mt-23">
							<LinkButton
								tag="button"
								type="button"
								onClick={handleClickLoadMore}
							>
								Show more
							</LinkButton>
						</div>
					)}
				</CommonContainer>
			</div>
		</div>
	)
}
