import { graphql, StaticQuery } from 'gatsby'
import React from 'react';

import CommonContainer from '@/components/CommonContainer'
import Vivus, { EASE_OUT } from '@/components/Vivus'

import './ContentTiles.scss'

export default props => (
	<StaticQuery
		query={graphql`
			query ContentTilesQuery {
				allAgilityContentTiles {
					nodes {
						properties {
							referenceName
						}
						linkedContent_tiles {
							contentID
							customFields {
								icon
								title
								subtitle
								text
							}
						}
					}
				}
			}
		`}
		render={queryData => {
			const thisModuleInstance = queryData.allAgilityContentTiles.nodes.filter(
				module =>
					module.properties.referenceName ===
					props.item.properties.referenceName
			)
			return (
				<ContentTiles
					contentTiles={thisModuleInstance[0].linkedContent_tiles}
					{...props}
				/>
			)
		}}
	/>
)

const ContentTiles = ({ contentTiles }) => {
	return (
		<CommonContainer className="mb-45 c-contenttiles">
			<div className="row no-gutters">
				{contentTiles?.sort((a,b) => a.contentID - b.contentID).map((tile, index) => {
					const { subtitle, text, title, icon } = tile.customFields

					const iconAnimationOptions = {
						type: 'sync',
						duration: 140,
						animTimingFunction: EASE_OUT,
					}

					// 0,6 - bg-yellow
					// 1,7 - bg-grey-light
					// 2,3,4,5 - bg-grey-dark
					let bgAndTextColor = 'bg-grey-dark text-white'
					let iconColor = 'text-yellow';
					switch (index) {
						case 0:
						case 6:
							bgAndTextColor = 'bg-yellow'
							iconColor = 'text-inherit'
							break
						case 1:
						case 7:
							bgAndTextColor = 'bg-grey-light'
							iconColor = 'text-inherit'
							break
						default:
							break
					}

					return (
						<div
							key={`contenttiles-${tile.contentID}`}
							className={`${bgAndTextColor} md:col-3 flex flex-col`}
						>
							<div
								className="flex flex-col"
								style={{ minHeight: 365 }}
							>
								<div className="flex-auto text-center px-12 py-13 relative">
									<Vivus
										id={`contenttiles-icon-${tile.contentID}`}
										className={`${iconColor} c-contenttiles__icon`}
										option={iconAnimationOptions}
										html={icon}
									/>
									{!!title && (
										<h2 className="mb-2 c-contenttiles__title">
											{title}
										</h2>
									)}
									{!!subtitle && (
										<div className="uppercase c-contenttiles__subtitle">
											{subtitle}
										</div>
									)}
									{!!text && (
										<p
											className={`${
												!!subtitle ? 'mt-3' : 'mt-4'
											}`}
										>
											{text}
										</p>
									)}
									{(index === 2 || index === 4) && (
										<div
											className="bg-grey-light absolute inset-y-0 right-0 my-9"
											style={{ width: 1 }}
										></div>
									)}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</CommonContainer>
	)
}
