import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import CommonContainer from '@/components/CommonContainer'
import ArticleTile from '@/components/ArticleTile'
import ArticleFeatured from '@/components/ArticleFeatured'
import toBool from '@/utils/convertBoolStrToBool'

import './ArticleListing.scss'

export default (props) => {
	return (
		<StaticQuery
			query={graphql`
				query AgilityArticlesQuery {
					allAgilityArticle {
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
								slug
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
		title, backgroundColor, isShowAllArticles,
		isFeaturedSectionShown, list
	} = item.customFields

	const newsList = toBool(isShowAllArticles) ? allItems : list

	return (
		<div className="c-articlelisting">
			<div className="my-30">
				<ArticleFeatured
					article={newsList.find(news => toBool(news.customFields.isFeatured))}
				></ArticleFeatured>
			</div>

			{/* purgecss: .bg-grey-light, .bg-grey-light-medium  */}
			<div className={`bg-${backgroundColor} py-23`}>
				<CommonContainer>
					{!!title && (<h2 className="text-center c-article-detail__related-title text-yellow">{title}</h2>) }

					<div className="overflow-hidden">
						<div className="row -mt-23 c-articlelisting__row">
							{newsList
								.filter(listItem => {
									return toBool(isFeaturedSectionShown)  ? !listItem.customFields.isFeatured : true;
								})
								.map(listItem => {
									return (
										<div
											key={`article-${listItem?.contentID || listItem?.id}`}
											className="md:col-4 mt-23 c-articlelisting__col"
										>
											<ArticleTile article={listItem}></ArticleTile>
										</div>
									)
								})}
						</div>
					</div>
				</CommonContainer>
			</div>
		</div>
	)
}
