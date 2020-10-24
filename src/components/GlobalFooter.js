import React, { Fragment, useEffect } from 'react';
import { graphql, StaticQuery } from "gatsby"

import Link from '@/components/Link';
import FooterSubscribeForm from '@/components/FooterSubscribeForm';
import { sortByItemOrderAsc } from '@/utils/sortByItemOrder'

export default props => (
	<StaticQuery
		query={graphql`
			query GlobalFooterQuery {
				agilityGlobalFooter {
					customFields {
						contactInfo
						contactTitle
						subscribeFormInfo
						subscribeFormTitle
						subscribeFormEndpoint
						footerLogo {
							url
						}
					}
					footerMainLinks {
						id
						properties {
							itemOrder
						}
						linkedContent_agilityLinkItems {
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
							linkedContent_agilityLinkChildren {
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
			<div className="container-fluid flex pt-12 pb-14">
				<div className="row w-full">
					<div className="md:offset-1 col-3">
						<Link to="/" className="logo-link">
							<img
								alt="Logo"
								src={footer.customFields.footerLogo.url}
								loading="lazy"
							/>
						</Link>
					</div>
					<div className="col-5">
						<div className="row">
							{footer.footerMainLinks
								?.sort(sortByItemOrderAsc)
								?.map(group => (
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
																{linkItem?.linkedContent_agilityLinkChildren
																	?.sort(
																		sortByItemOrderAsc
																	)
																	?.map(
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
						<FooterSubscribeForm
							title={footer.customFields.subscribeFormTitle}
							info={footer.customFields.subscribeFormInfo}
							endpoint={footer.customFields.subscribeFormEndpoint}
						/>
					</div>
				</div>
			</div>
			<div
				className="py-3 text-white b-fstiny"
				style={{ backgroundColor: `rgba(0,0,0,.75)` }}
			>
				<div className="container-fluid">
					<div className="row w-full items-center">
						<div className="md:offset-1 col-3">
							&copy; {new Date().getFullYear()} Investa. All
							rights reserved.
						</div>
						<div className="col-5 space-x-6">
							{footer.footerBottomLinks.map(bottomLink => {
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
						<div className="col-3 space-x-4">
							{footer.footerBottomLogos
								.sort(sortByItemOrderAsc)
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
				</div>
			</div>
		</footer>
	)
}


