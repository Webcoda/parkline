import React from 'react'
import { graphql, StaticQuery } from "gatsby";
import CommonContainer from '@/components/CommonContainer'
import Richtext from '@/components/Richtext'
import BaseImg from '@/components/BaseImg'
import SmallDivider from '@/components/SmallDivider'
import { sortByItemOrderAsc } from "@/utils/sortByItemOrder";

import './MeetTheTeam.scss'

export default props => (
	<StaticQuery
		query={graphql`
			query MeetTheTeamQuery {
				allAgilityMeetTheTeam {
					nodes {
						customFields {
							title
							text
						}
						properties {
							referenceName
						}
						linkedContent_teamTiles {
							id
							properties {
								itemOrder
							}
							customFields {
								cTA {
									href
									target
									text
								}
								text
								title
								media {
									url
								}
							}
						}
					}
				}
			}
		`}
		render={queryData => {
			const thisModuleInstance = queryData.allAgilityMeetTheTeam.nodes.filter(
				module =>
					module.properties.referenceName ===
					props.item.properties.referenceName
			)
			return (
				<MeetTheTeam
					tiles={thisModuleInstance[0].linkedContent_teamTiles}
					{...props}
				/>
			)
		}}
	/>
)

const MeetTheTeam = (props) => {
	const { item, tiles } = props;
	const { title, text } = item.customFields
	return (
		<div className="bg-yellow py-23 text-center">
			<CommonContainer>
				{ !!title && (<h2 className="mb-11">{ title }</h2>) }
				{
					!!text && (
						<Richtext className="md:w-6/10 mx-auto mb-18 font-normal" html={text}></Richtext>
					)
				}

				<SmallDivider className="my-11" />

				<div className="row no-gutters">
					{
						tiles?.sort(sortByItemOrderAsc).map(tile => {
							const mediaImgSources = [
								{
									srcset: [
										{
											src: tile.customFields.media.url + '?w=400',
											descriptor: '400w',
										},
									],
									type: 'image/png',
								},
							]

							return (
								<div
									key={tile.id}
									className="col flex flex-col c-meettheteam__tile overflow-hidden group">
									<div className="flex-1 flex flex-col relative c-meettheteam__tile-inner">
										<div className="u-embed__item">
											<BaseImg
												sources={mediaImgSources}
											></BaseImg>
										</div>
										<div className="u-embed__item flex flex-col items-center justify-center text-white px-6">
											<div className="uppercase font-bold c-meettheteam__tile-title">
												{tile.customFields.title}
											</div>
										</div>
										<div className="relative flex-1 flex flex-col translate-y-full group-hocus:translate-y-0 transition duration-500 overflow-hidden">
											<div className="flex-1 flex flex-col -translate-y-full group-hocus:translate-y-0 transition duration-500">
												<div className="u-embed__item">
													<BaseImg
														sources={
															mediaImgSources
														}
													></BaseImg>
												</div>
												<div
													className="relative flex-1 pt-7 pb-6 px-7 flex flex-col justify-between text-left"
													style={{
														background: `rgba(240, 240, 240, 0.9)`,
														color: '#404040',
													}}
												>
													<Richtext
														className="mb-18 font-normal c-meettheteam__tile-text"
														html={
															tile.customFields
																.text
														}
													></Richtext>
													<SmallDivider className="mt-9 mb-6" />
													<div
														aria-hidden="true"
														className="mb-3 uppercase font-bold c-meettheteam__tile-title"
													>
														{
															tile.customFields
																.title
														}
													</div>
													{
														<div className="inline-flex items-center space-x-1.5 uppercase b-fsxtiny">
															<span aria-hidden="true">
																{
																	tile
																		.customFields
																		.cTA
																		.text
																}
															</span>
															<svg
																width="22"
																height="24"
																viewBox="0 0 22 24"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M11.092 22.9541L21 11.9771L11.092 1.0001"
																	stroke="#231F20"
																	strokeWidth="0.75"
																	strokeLinecap="round"
																/>
																<path
																	d="M20.9746 11.9766L0.82361 11.9766"
																	stroke="#231F20"
																	strokeWidth="0.75"
																	strokeLinecap="round"
																/>
															</svg>
														</div>
													}
												</div>
											</div>
										</div>
										<a
											href={tile.customFields.cTA.href}
											target={tile.customFields.cTA.target}
											className="u-embed__item opacity-0"
										>
											<span className="sr-only">
												{tile.customFields.cTA.text}
											</span>
										</a>
									</div>
								</div>
							)
						})
					}
				</div>

			</CommonContainer>
		</div>
	);
}
