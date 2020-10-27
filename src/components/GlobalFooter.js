import React, { Fragment, useEffect } from 'react';
import { graphql, StaticQuery } from "gatsby"

import Link from '@/components/Link';
import FooterSubscribeForm from '@/components/FooterSubscribeForm';
import { sortByItemOrderAsc } from '@/utils/sortByItemOrder'

import './GlobalFooter.scss'

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

	const renderFooterBottomLogos = () => {
		return footer.footerBottomLogos.sort(sortByItemOrderAsc).map(bottomLogo => {
			const { url, image } = bottomLogo.customFields
			return (
				<Link
					key={bottomLogo.id}
					className="text-inherit hocus:text-inherit"
					to={url.href}
					target={url.target}
					aria-label={url.text}
				>
					<img className="js-lazysizes" data-src={image.url} />
				</Link>
			)
		})
	}

	return (
		<footer
			className="bg-grey-light u-bgimg border-t-5 border-yellow js-lazysizes"
			data-bgset="/footer-background.svg"
		>
			<div className="container-fluid flex pt-12 pb-14">
				<div className="row w-full">
					<div className="col-12 md:offset-1 md:col-3">
						<Link to="/" className="c-footer__logo">
							<img
								alt="Logo"
								src={footer.customFields.footerLogo.url}
								loading="lazy"
							/>
						</Link>
					</div>
					<div className="col-12 md:col-5 mt-9 md:mt-0">
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
														className="col-6 md:col"
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
							<div className="col-12 md:col mt-12 md:mt-0">
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
					<div className="col-12 md:col-2 mt-12 md:mt-0">
						<FooterSubscribeForm
							title={footer.customFields.subscribeFormTitle}
							info={footer.customFields.subscribeFormInfo}
							endpoint={footer.customFields.subscribeFormEndpoint}
						/>
					</div>
				</div>
			</div>
			<div
				className="pt-7 pb-6 md:py-3 text-white b-fstiny"
				style={{ backgroundColor: `rgba(0,0,0,.75)` }}
			>
				<div className="container-fluid">
					<div className="row w-full items-center">
						<div className="md:hidden col-12 space-x-4">
							{renderFooterBottomLogos()}
						</div>
						<div className="hidden md:block md:offset-1 col-3 mt-10 md:mt-0">
							&copy; {new Date().getFullYear()} Investa. All
							rights reserved.
						</div>
						<div className="col-12 md:col-5 space-x-6 flex justify-between md:justify-start mt-10 md:mt-0">
							{footer.footerBottomLinks.sort(sortByItemOrderAsc).map((bottomLink, index) => {
								const { link } = bottomLink.customFields
								return (
									<Fragment key={bottomLink.id}>
										{
											index === footer.footerBottomLinks.length - 1 && (
												<div className="flex-1 text-center md:hidden">
													&copy;{' '}
													{new Date().getFullYear()}{' '}
													Investa. All rights reserved.
												</div>
											)
										}
										<Link
											className="flex-shrink-0 text-inherit hocus:text-inherit"
											to={link.href}
											target={link.target}
										>
											{link.text}
										</Link>
									</Fragment>
								)
							})}
						</div>
						<div className="hidden md:block md:col-3 space-x-4">
							{renderFooterBottomLogos()}
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}


