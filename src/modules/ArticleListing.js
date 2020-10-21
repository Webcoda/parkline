import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import CommonContainer from '@/components/CommonContainer'
import BaseImg from '@/components/BaseImg'
import ArticleTile from '@/components/ArticleTile'

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


const FeaturedArticle = ({ mediaItem }) => {
	const mediaImgSources = [
		{
			srcset: [
				{
					src: mediaItem.url + '?w=2560',
					descriptor: '2560w',
				},
				{
					src: mediaItem.url + '?w=1920',
					descriptor: '1920w',
				},
				{
					src: mediaItem.url + '?w=1024',
					descriptor: '1024w',
				},
				{
					src: mediaItem.url + '?w=768',
					descriptor: '768w',
				},
				{
					src: mediaItem.url + '?w=480',
					descriptor: '480w',
				},
			],
			type: 'image/png',
		},
	]

	return (
		<div className="container-fluid">
			<div className="row">
				<div class="flex flex-col c-imagewithlisttext__col-media md:col-6">
					<div class="flex-1 flex c-imagewithlisttext__col-media-inner flex-row-reverse">
						<div class="flex-auto relative">
							<div class="u-embed__item">
								<BaseImg sources={mediaImgSources}></BaseImg>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

/**
 *
 * Notes:
 * 1. If isFeaturedSectionShown == true and isShowAllArticles == true, use allItems - excluding isFeatured
 * 2. If isFeaturedSectionShown == true and isShowAllArticles == false, use item.customFields.list
 * 3. If isFeaturedSectionShown == false and isShowAllArticles == true, use allItems including isFeatured
 * 4. If isFeaturedSectionShown == false and isShowAllArticles == false, use item.customFields.list
 */

const ArticleListing = ({ item, allItems }) => {
	const {
		title, backgroundColor, isShowAllArticles,
		isFeaturedSectionShown, list
	} = item.customFields

	const newsList = isShowAllArticles ? allItems : list

	console.log(item.customFields)
	return (
		<div className="c-articlelisting">
			{/* <FeaturedArticle></FeaturedArticle> */}
			{/* purgecss: .bg-grey-light, .bg-grey-light-medium  */}
			<div className={`bg-${backgroundColor} py-23`}>
				<CommonContainer className="overflow-hidden">
					<div className="row -mt-23 c-articlelisting__row">
						{newsList
							.filter(listItem => {
								return isShowAllArticles ? !listItem.isFeatured : true;
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
				</CommonContainer>
			</div>
		</div>
	)
}
