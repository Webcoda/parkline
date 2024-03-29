import { graphql, StaticQuery } from 'gatsby'
import React from 'react';

import Vivus, { EASE_OUT } from '@/components/Vivus'
import { sortByItemOrderAsc } from "@/utils/sortByItemOrder";
import { renderHTML } from "@/agility/utils";

import './ContentTiles.scss'

export default props => (
	<StaticQuery
		query={graphql`
			query ContentTilesQuery {
				allAgilityContentTiles {
					nodes {
						customFields {
							finePrint
						}
						properties {
							referenceName
						}
						linkedContent_tiles {
							id
							customFields {
								icon
								title
								subtitle
								text
							}
							properties {
								itemOrder
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

const ContentTileInner = ({
	children,
	slotIcon,
	slotIconHover,
	hoverBgAndTextColor,
}) => (
	<>
		<div className="flex-auto flex sm:block flex-col justify-center text-center px-6 md:px-3 py-6 relative c-contenttiles__tile-content">
			{slotIcon}
			{children}
		</div>
		<div className="absolute inset-0 flex flex-col translate-y-full group-hocus:translate-y-0 transition duration-500 overflow-hidden c-contenttiles__tile-content-hover">
			<div
				className={`flex-1 flex sm:block flex-col justify-center text-center px-6 md:px-3 py-6 -translate-y-full group-hocus:translate-y-0 transition duration-500 ${hoverBgAndTextColor} c-contenttiles__tile-content`}
			>
				{slotIconHover}
				{children}
			</div>
		</div>
	</>
)

const ContentTiles = ({ contentTiles, item }) => {
	const { finePrint } = item.customFields
	return (
		<div className="mx-auto sm:mb-20 md:my-25 c-contenttiles">
			<div className="row no-gutters">
				{contentTiles
					?.sort(sortByItemOrderAsc)
					.map((tile, index) => {
						const {
							subtitle,
							text,
							title,
							icon,
						} = tile.customFields

						const iconAnimationOptions = {
							type: 'sync',
							duration: 140,
							animTimingFunction: EASE_OUT,
						}

						// 0,6 - bg-yellow
						// 1,7 - bg-grey-light
						// 2,3,4,5 - bg-grey-dark
						let bgAndTextColor = 'bg-grey-dark text-white'
						let iconColor = 'text-yellow'
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

						let hoverBgAndTextColor =
							'bg-grey-medium text-grey-dark'
						let hoverIconColor = 'text-white'
						switch (index) {
							case 0:
							case 7:
								hoverBgAndTextColor = 'bg-black text-white'
								hoverIconColor = 'text-yellow'
								break
							case 2:
								hoverBgAndTextColor =
									'bg-yellow text-grey-dark'
								hoverIconColor = 'text-grey-dark'
								break
							case 5:
								hoverBgAndTextColor =
									'bg-grey-light text-grey-dark'
								hoverIconColor = 'text-grey-dark'
								break
							default:
								break
						}

						return (
							<div
								key={tile.id}
								className={`${bgAndTextColor} col-6 lg:col-3 flex flex-col overflow-hidden c-contenttiles__tile`}
								data-aos="fade-up"
							>
								<div className="flex-auto flex flex-col relative pb-full group overflow-hidden c-contenttiles__tile-inner">
									<div className="absolute inset-0 flex flex-col">
										<ContentTileInner
											hoverBgAndTextColor={
												hoverBgAndTextColor
											}
											slotIcon={
												<Vivus
													id={`icon-${tile.id}`}
													className={`${iconColor} c-contenttiles__icon`}
													option={
														iconAnimationOptions
													}
													html={icon}
												/>
											}
											slotIconHover={
												<Vivus
													id={`icon2-${tile.id}`}
													className={`${hoverIconColor} sm:inline-block c-contenttiles__icon`}
													option={
														iconAnimationOptions
													}
													html={icon}
												/>
											}
										>
											{!!title && (
												<h2
													className="mb-2 c-contenttiles__title"
													dangerouslySetInnerHTML={renderHTML(
														title.replace(
															/(?:\r\n|\r|\n)/g,
															'<br>'
														)
													)}
												></h2>
											)}
											{!!subtitle && (
												<div
													className="hidden sm:block uppercase c-contenttiles__subtitle"
													dangerouslySetInnerHTML={renderHTML(
														subtitle.replace(
															/(?:\r\n|\r|\n)/g,
															'<br>'
														)
													)}
												/>
											)}
											{!!text && (
												<p
													className={`hidden sm:block font-normal c-contenttiles__text ${
														!!subtitle
															? 'mt-3'
															: 'mt-4'
													}`}
													dangerouslySetInnerHTML={renderHTML(
														text.replace(
															/(?:\r\n|\r|\n)/g,
															'<br>'
														)
													)}
												/>
											)}
											{(index === 2 || index === 4) && (
												<div
													className="bg-grey-light absolute inset-y-0 right-0 my-9"
													style={{ width: 1 }}
												></div>
											)}
										</ContentTileInner>
										{/* <a
										href={tile.customFields.cTA.href}
										target={tile.customFields.cTA.target}
										className="u-embed__item opacity-0"
									>
										<span className="sr-only">
											{tile.customFields.cTA.text}
										</span>
									</a> */}
									</div>
								</div>
							</div>
						)
					})}
			</div>
			{finePrint && (
				<p
					className="small mt-10 text-right"
					dangerouslySetInnerHTML={renderHTML(
						finePrint.replace(/(?:\r\n|\r|\n)/g, '<br>')
					)}
				/>
			)}
		</div>
	)
}
