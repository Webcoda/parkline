import React, { Fragment, useEffect } from 'react';
import { graphql, StaticQuery } from "gatsby"

import Link from '@/components/Link';
import CommonContainer from "@/components/CommonContainer";


export default props => (
	<StaticQuery
		query={graphql`
			query GlobalFooterQuery {
				agilityGlobalHeader(
					properties: { referenceName: { eq: "globalheader" } }
				) {
					customFields {
						siteName
					}
				}
				allAgilitySitemapNode {
					nodes {
						languageCode
						path
						menuText
						pageID
					}
				}
				agilityGlobalFooter {
					customFields {
						contactInfo
						contactTitle
						subscribeFormInfo
						subscribeFormTitle
						footerLogo {
							url
						}
					}
					footerMainLinks {
						id
						linkedContent_agilityLinkItems {
							id
							customFields {
								link {
									href
									target
									text
								}
							}
							linkedContent_agilityLinkChildren {
								id
								customFields {
									link {
										href
										target
										text
									}
								}
							}
						}
					}
					footerBottomLinks {
						id
						properties {
							itemOrder
						}
						customFields {
							link {
								href
								target
								text
							}
						}
					}
					footerBottomLogos {
						id
						properties {
							itemOrder
						}
						customFields {
							image {
								url
								pixelWidth
								pixelHeight
							}
							url {
								href
								target
								text
							}
						}
					}
				}
			}
		`}
		render={queryData => {
			const viewModel = {
				item: queryData.agilityGlobalHeader,
				footer: queryData.agilityGlobalFooter,
			}
			return <GlobalFooter {...viewModel} />
		}}
	/>
)

const GlobalFooter = ({ footer }) => {
	useEffect(() => {
		/* eslint-disable */
		import ('@/utils/lazysizes')
	}, [])

	return (
		<footer
			className="bg-grey-light u-bgimg border-t-5 border-yellow js-lazysizes"
			data-bgset="/footer-background.svg"
		>
			<CommonContainer className="flex pt-12 pb-14">
				<div className="row w-full">
					<div className="col-4">
						<Link to="/" className="logo-link">
							<img
								alt="Logo"
								src={footer.customFields.footerLogo.url}
								loading="lazy"
							/>
						</Link>
					</div>
					<div className="col-6">
						<div className="row">
							{footer.footerMainLinks?.map(group => (
								<Fragment key={group.id}>
									{group?.linkedContent_agilityLinkItems.map(
										linkItem => {
											const parentTo =
												linkItem?.customFields.link
													?.href
											const parentTarget =
												linkItem?.customFields.link
													?.target
											const parentText =
												linkItem?.customFields.link
													?.text

											return (
												<div
													key={linkItem.id}
													className="col"
												>
													<div className="font-bold mb-2">
														<Link
															className="text-inherit hocus:text-inherit"
															to={parentTo}
															target={
																parentTarget
															}
														>
															{parentText}
														</Link>
													</div>
													{
														<div className="mt-2 space-y-2">
															{linkItem?.linkedContent_agilityLinkChildren.map(
																childLinkItem => {
																	const to =
																		childLinkItem
																			.customFields
																			.link
																			?.href
																	const target =
																		childLinkItem
																			.customFields
																			.link
																			?.target
																	const text =
																		childLinkItem
																			.customFields
																			.link
																			?.text

																	return (
																		<div
																			key={
																				childLinkItem.id
																			}
																			className="small font-normal"
																		>
																			<Link
																				className="text-inherit hocus:text-inherit"
																				to={
																					to
																				}
																				target={
																					target
																				}
																			>
																				{
																					text
																				}
																			</Link>
																		</div>
																	)
																}
															)}
														</div>
													}
												</div>
											)
										}
									)}
								</Fragment>
							))}
							<div className="col">
								{!!footer.customFields.contactTitle && (
									<div className="b-fsregular font-bold mb-4">
										{footer.customFields.contactTitle}
									</div>
								)}
								{!!footer.customFields.contactInfo && (
									<div
										className="small font-normal o-richtext"
										dangerouslySetInnerHTML={{
											__html: footer.customFields.contactInfo
												.replace(/<p><\/p>/g, '')
												.replace(/\r\n\r\n/g, '<br>')
												.replace(/<p><\/p>/g, '<br>'),
										}}
									></div>
								)}
							</div>
						</div>
					</div>
					<div className="col-2">
						<form>
							{!!footer.customFields.subscribeFormTitle && (
								<div className="b-fsregular font-bold mb-4">
									{footer.customFields.subscribeFormTitle}
								</div>
							)}
							<label className="mb-6 flex">
								<input
									type="email"
									name="email"
									placeholder="Your email address"
									className="bg-white h-9.5 px-2.5 py-3 flex-1 b-fsregular md:b-fsxtiny"
								/>
								<button
									className="inline-flex items-center justify-center w-9.5 h-9.5 bg-yellow flex-shrink-0"
									aria-label="Submit"
								>
									<svg
										aria-hidden="true"
										focusable="false"
										width="38"
										height="39"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M28.843 10.238L8.164 16.603l4.206 3.6 12.363-6.736-10.19 8.596v5.596l2.688-3.295 3.97 3.4 7.642-17.526z"
											fill="currentColor"
										/>
									</svg>
								</button>
							</label>
							{!!footer.customFields.subscribeFormInfo && (
								<p className="small font-normal">
									{footer.customFields.subscribeFormInfo}
								</p>
							)}
						</form>
					</div>
				</div>
			</CommonContainer>
			<div
				className="py-3 text-white b-fstiny"
				style={{ backgroundColor: `rgba(0,0,0,.75)` }}
			>
				<CommonContainer>
					<div className="row w-full items-center">
						<div className="col-4">
							&copy; 2020 Investa. All rights reserved.
						</div>
						<div className="col-6 space-x-6">
							{footer.footerBottomLinks
								.map(bottomLink => {
									const { link } = bottomLink.customFields
									return (
										<Link
											key={bottomLink.id}
											className="text-inherit hocus:text-inherit"
											to={link.href}
											target={link.target}
										>
											{link.text}
										</Link>
									)
								})}
						</div>
						<div className="col-2 space-x-4">
							{footer.footerBottomLogos
								.map(bottomLogo => {
									const {
										url,
										image,
									} = bottomLogo.customFields
									return (
										<Link
											key={bottomLogo.id}
											className="text-inherit hocus:text-inherit"
											to={url.href}
											target={url.target}
											aria-label={url.text}
										>
											<img
												className="js-lazysizes"
												data-src={image.url}
											/>
										</Link>
									)
								})}
						</div>
					</div>
				</CommonContainer>
			</div>
		</footer>
	)
}


