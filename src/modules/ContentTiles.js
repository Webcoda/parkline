import { graphql, StaticQuery } from 'gatsby'
import React from 'react';

import CommonContainer from '@/components/CommonContainer'
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

const ContentTiles = ({ contentTiles }) => {
	return (
		<CommonContainer className="mb-20 md:my-45 c-contenttiles">
			<div className="-mx-5 md:mx-0">
				<div className="row no-gutters">
					{contentTiles?.sort(sortByItemOrderAsc).map((tile, index) => {
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

						let hoverBgAndTextColor = 'bg-grey-medium text-grey-dark'
						let hoverIconColor = 'text-white'
						switch (index) {
							case 0:
							case 7:
								hoverBgAndTextColor = 'bg-black text-white'
								hoverIconColor = 'text-yellow'
								break
							case 2:
								hoverBgAndTextColor = 'bg-yellow text-grey-dark'
								hoverIconColor = 'text-grey-dark'
								break
							case 5:
								hoverBgAndTextColor = 'bg-grey-light text-grey-dark'
								hoverIconColor = 'text-grey-dark'
								break
							default:
								break
						}

						return (
							<div
								key={tile.id}
								className={`${bgAndTextColor} col-6 lg:col-3 flex flex-col c-contenttiles__tile`}
								data-aos="fade-up"
							>
								<div className="flex-auto flex flex-col relative pb-full group overflow-hidden c-contenttiles__tile-inner">
									<div className="absolute inset-0 flex flex-col">
										<div className="flex-auto flex md:block flex-col justify-center text-center px-6 md:px-12 py-6 relative c-contenttiles__tile-content">
											<Vivus
												id={`icon-${tile.id}`}
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
												<div className="hidden md:block uppercase c-contenttiles__subtitle">
													{subtitle}
												</div>
											)}
											{!!text && (
												<p
													className={`hidden md:block font-normal ${
														!!subtitle
															? 'mt-3'
															: 'mt-4'
													}`}
													dangerouslySetInnerHTML={renderHTML(
														text.replaceAll(
															'\r\n',
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
										</div>
										<div className="absolute inset-0 flex flex-col translate-y-full group-hocus:translate-y-0 transition duration-500 overflow-hidden">
											<div
												className={`flex-1 flex md:block flex-col justify-center text-center px-6 md:px-12 py-6 -translate-y-full group-hocus:translate-y-0 transition duration-500 ${hoverBgAndTextColor} c-contenttiles__tile-content`}
											>
												<Vivus
													id={`icon2-${tile.id}`}
													className={`${hoverIconColor} hidden md:inline-block c-contenttiles__icon`}
													option={
														iconAnimationOptions
													}
													html={icon}
												/>
												{!!title && (
													<h2 className="hidden md:block mb-2 c-contenttiles__title">
														{title}
													</h2>
												)}
												{!!subtitle && (
													<div className="hidden md:block uppercase c-contenttiles__subtitle">
														{subtitle}
													</div>
												)}
												{!!text && (
													<p
														className={`font-normal ${
															!!subtitle
																? 'mt-3'
																: 'mt-4'
														}`}
														dangerouslySetInnerHTML={renderHTML(
															text.replaceAll(
																'\r\n',
																'<br>'
															)
														)}
													/>
												)}
												{(index === 2 ||
													index === 4) && (
													<div
														className="bg-grey-light absolute inset-y-0 right-0 my-9"
														style={{ width: 1 }}
													></div>
												)}
											</div>
										</div>
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
			</div>
		</CommonContainer>
	)
}
