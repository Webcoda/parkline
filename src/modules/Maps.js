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
						}
						linkedContent_mapKeys {
							id
							contentID
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
					mapKeys={thisModuleInstance[0].linkedContent_mapKeys}
					{...props}
				/>
			)
		}}
	/>
)

const Maps = ({ items, mapKeys }) => {
	console.log(items);

	useEffect(() => {
		/* eslint-disable */
		import('bootstrap/js/src/tab');
		import('@/utils/lazysizes')
	}, [])
	return (
		<div>
			<CommonContainer>
				<div>
					<div>
						{!!items && !!items.length && (
							<>
								<div className="row nav" role="tablist">
									{items
										.sort(
											(a, b) => a.contentID - b.contentID
										)
										.map((mapItem, index) => {
											const {
												title
											} = mapItem.customFields
											return (
												<div
													key={`tabnav-${mapItem.id}`}
													className="col"
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
												</div>
											)
										})}
								</div>
								<div className="tab-content">
									{items
										.sort(
											(a, b) => a.contentID - b.contentID
										)
										.map((mapItem, index) => {
											const {
												image
											} = mapItem.customFields
											return (
												<div
													key={`tab-${mapItem.id}`}
													className={`tab-pane fade ${
														index === 0
															? 'show active'
															: ''
													}`}
													id={`tab-${mapItem.id}`}
													aria-labelledby={`tabnav-${mapItem.id}`}
												>
													<img
														className="w-full"
														src={image.url}
														alt=""
													/>
												</div>
											)
										})}
								</div>
							</>
						)}
					</div>
					<div className="bg-yellow p-11 flex justify-center">
						{!!mapKeys && !!mapKeys.length && (
							<div className="flex items-center space-x-13">
								<div className="font-bold">Map Key</div>
								<div className="font-bold space-x-8 flex">
									{mapKeys
										?.sort(
											(a, b) => a.contentID - b.contentID
										)
										.map(mapKey => {
											const {
												title,
												image,
											} = mapKey.customFields
											return (
												<div
													key={mapKey.id}
													className="uppercase space-x-4 flex items-center"
												>
													<img
														src={image.url}
														alt=""
													/>
													<div className="text-base leading-none">
														{title}
													</div>
												</div>
											)
										})}
								</div>
							</div>
						)}
					</div>
				</div>
			</CommonContainer>
		</div>
	)
}
