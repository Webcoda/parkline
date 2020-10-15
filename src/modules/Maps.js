import React, { useEffect } from 'react'
import { StaticQuery, graphql } from "gatsby";
import CommonContainer from '@/components/CommonContainer'

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
							contentID
							customFields {
								title
								image {
									url
								}
							}
							linkedContent_mapKeys {
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
		import('@/utils/lazysizes')
	}, [])

	const sortedItems = items.sort((a, b) => a.contentID - b.contentID)

	return (
		<div>
			<CommonContainer>
				<div>
					<div>
						{!!items && !!items.length && (
							<>
								<ul className="row nav" role="tablist">
									{sortedItems.map((mapItem, index) => {
										const { title } = mapItem.customFields
										return (
											<li
												key={`tabnav-${mapItem.id}`}
												className="col nav-item"
											>
												<a
													id={`tabnav-${mapItem.id}`}
													role="tab"
													data-toggle="tab"
													href={`#tab-${mapItem.id}`}
													aria-controls={`tab-${mapItem.id}`}
													aria-selected={
														index === 0
															? 'true'
															: 'false'
													}
													className={`bg-grey-dark active:bg-yellow block p-5 text-center text-xs leading-none text-white active:text-black uppercase hocus:no-underline hocus:text-black hocus:bg-grey-light transition duration-300 ${
														index === 0
															? 'active'
															: ''
													}`}
												>
													{title}
												</a>
											</li>
										)
									})}
								</ul>
								<div className="tab-content">
									{sortedItems.map((mapItem, index) => {
										const { id, customFields, linkedContent_mapKeys } = mapItem
										const { image } = customFields
										return (
											<>
												<div
													key={`tab-${id}`}
													className={`tab-pane fade ${
														index === 0
															? 'show active'
															: ''
													}`}
													id={`tab-${id}`}
													aria-labelledby={`tabnav-${id}`}
												>
													<img
														className="w-full js-lazysizes"
														data-src={image.url}
														alt=""
													/>
													<div className="bg-yellow p-11 flex justify-center">
														{!!linkedContent_mapKeys &&
															!!linkedContent_mapKeys.length && (
																<div className="flex items-center space-x-13">
																	<div className="font-bold">
																		Map Key
																	</div>
																	<div className="font-bold space-x-8 flex">
																		{linkedContent_mapKeys
																			?.sort(
																				(
																					a,
																					b
																				) =>
																					a.contentID -
																					b.contentID
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
																							className="uppercase space-x-4 flex items-center"
																						>
																							<img
																								className="js-lazysizes"
																								data-src={
																									mapKeyImage.url
																								}
																								alt=""
																							/>
																							<div className="text-base leading-none">
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
											</>
										)
									})}
								</div>
							</>
						)}
					</div>
				</div>
			</CommonContainer>
		</div>
	)
}
