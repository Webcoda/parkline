import React, { Fragment, useEffect } from 'react'
import { StaticQuery, graphql } from "gatsby";
import encodeUrl from 'encodeurl'

import CommonContainer from '@/components/CommonContainer'
import { sortByItemOrderAsc } from "@/utils/sortByItemOrder";
import './Maps.scss'

export default props => (
	<StaticQuery
		query={graphql`
			query MapsQuery {
				allAgilityMaps {
					nodes {
						properties {
							referenceName
						}
						linkedContent_mapItems {
							id
							properties {
								itemOrder
							}
							customFields {
								title
								image {
									url
								}
							}
							linkedContent_mapKeys {
								id
								properties {
									itemOrder
								}
								customFields {
									title
									image {
										url
									}
								}
							}
						}
					}
				}
			}
		`}
		render={queryData => {
			const thisModuleInstance = queryData.allAgilityMaps.nodes.filter(
				module =>
					module.properties.referenceName ===
					props.item.properties.referenceName
			)
			return (
				<Maps
					items={thisModuleInstance[0].linkedContent_mapItems}
					{...props}
				/>
			)
		}}
	/>
)

const Maps = ({ items }) => {
	useEffect(() => {
		/* eslint-disable */
		import('bootstrap/js/src/tab');
	}, [])

	const sortedItems = items.sort(sortByItemOrderAsc)

	return (
		<div data-aos="fade-up">
			<CommonContainer className="bg-grey-light pt-13.5 md:pt-0 md:bg-transparent">
				{!!items && !!items.length && (
					<div>
						<ul className="row nav" role="tablist">
							{sortedItems.map((mapItem, index) => {
								const { title } = mapItem.customFields
								return (
									<li
										key={`tabnav-${mapItem.id}`}
										className="flex flex-col col-6 md:col mt-5 nav-item"
									>
										<a
											id={`tabnav-${mapItem.id}`}
											role="tab"
											data-toggle="tab"
											href={`#tab-${mapItem.id}`}
											aria-controls={`tab-${mapItem.id}`}
											aria-selected={
												index === 0 ? 'true' : 'false'
											}
											className={`flex-auto bg-grey-dark active:bg-yellow px-3 sm:px-4 py-5 flex items-center justify-center text-xs leading-none text-white active:text-black uppercase hocus:no-underline hocus:text-black hocus:bg-grey-light transition duration-300 ${
												index === 0 ? 'active' : ''
											}`}
										>
											{title}
										</a>
									</li>
								)
							})}
						</ul>
						<div className="tab-content mt-5 md:mt-0 -mx-5 md:mx-0">
							{sortedItems.map((mapItem, index) => {
								const {
									id,
									customFields,
									linkedContent_mapKeys,
								} = mapItem
								const { image } = customFields
								return (
									<Fragment key={`tab-${id}`}>
										<div

											className={`tab-pane fade ${
												index === 0 ? 'show active' : ''
											}`}
											id={`tab-${id}`}
											aria-labelledby={`tabnav-${id}`}
										>
											<img
												className="w-full js-lazysizes"
												data-src={encodeUrl(image.url)}
												alt=""
											/>
											<div className="bg-yellow p-5 md:p-11 flex md:justify-center">
												{!!linkedContent_mapKeys &&
													!!linkedContent_mapKeys.length && (
														<div className="flex flex-auto md:flex-initial flex-wrap md:flex-no-wrap items-center md:space-x-13">
															<div className="font-bold w-full md:w-auto c-maps__legend-title">
																Map Key
															</div>
															<div className="font-bold md:space-x-8 flex flex-wrap flex-auto justify-end md:justify-start">
																{linkedContent_mapKeys
																	?.sort(
																		sortByItemOrderAsc
																	)
																	.map(
																		mapKey => {
																			const {
																				title: mapKeyTitle,
																				image: mapKeyImage,
																			} = mapKey.customFields
																			return (
																				<div
																					key={
																						mapKey.id
																					}
																					className="uppercase space-x-1 md:space-x-4 flex items-start md:items-center w-1/3 md:w-auto mt-5 md:mt-0"
																				>
																					<img
																						className="c-maps__key-icon js-lazysizes"
																						data-src={
																							encodeUrl(mapKeyImage.url)
																						}
																						alt=""
																					/>
																					<div className="text-base leading-none mt-1 md:mt-0 c-maps__key-title">
																						{
																							mapKeyTitle
																						}
																					</div>
																				</div>
																			)
																		}
																	)}
															</div>
														</div>
													)}
											</div>
										</div>
									</Fragment>
								)
							})}
						</div>
					</div>
				)}
			</CommonContainer>
		</div>
	)
}
