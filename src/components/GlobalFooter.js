import React, { Fragment, useEffect } from 'react';
import { graphql, StaticQuery } from "gatsby"

import Link from '@/components/Link';
import FooterSubscribeForm from '@/components/FooterSubscribeForm';
import Richtext from "@/components/Richtext";
import { sortByItemOrderAsc } from '@/utils/sortByItemOrder'

import './GlobalFooter.scss'

const isPrivacyTermsLink = link => link.href === '#privacy' || link.href === '#terms'

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
						privacyContent
						termsContent
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

const Collapse = ({ id, content }) => (
	<div id={id} className="collapse" data-parent="#privacyterms-accordion">
		<div className="pt-10">
			<Richtext html={content} />
			<button
				type="button"
				data-toggle="collapse"
				data-target={`#${id}`}
				className="b-fsxtiny mt-15 space-x-2 inline-flex items-center text-white uppercase"
			>
				<svg
					width="30"
					height="30"
					viewBox="0 0 30 30"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					focusable="false"
					aria-hidden="true"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M0 30H30V0H0V30Z"
						fill="#F0F0F0"
					/>
					<line
						x1="6.6016"
						y1="6.77926"
						x2="23.3954"
						y2="23.573"
						stroke="#333333"
					/>
					<line
						x1="23.3946"
						y1="6.60258"
						x2="6.60078"
						y2="23.3964"
						stroke="#333333"
					/>
				</svg>

				<span>Close</span>
			</button>
		</div>
	</div>
)

const GlobalFooter = ({ footer }) => {
	useEffect(() => {
		/* eslint-disable */
		import ('@/utils/lazysizes')
		import ('bootstrap/js/src/collapse')
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

	const handleToggleCollapse = (ev) => {
		ev.preventDefault();
		const { target } = ev.currentTarget.dataset;
		setTimeout(() => {
			document
				.querySelector(target)
				.scrollIntoView({ behavior: 'smooth' })
		}, 400);

	}

	return (
		<footer className="bg-grey-light border-t-5 border-yellow">
			<div
				className="container-fluid flex pt-12 pb-14 u-bgimg js-lazysizes"
				data-bgset="/footer-background.svg"
			>
				<div className="row flex-auto">
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
				id="privacyterms-accordion"
			>
				<div className="container-fluid">
					<div className="row items-center">
						<div className="md:hidden col-12 space-x-4">
							{renderFooterBottomLogos()}
						</div>
						<div className="hidden md:block md:offset-1 col-3 mt-10 md:mt-0">
							&copy; {new Date().getFullYear()} Investa. All
							rights reserved.
						</div>
						<div className="col-12 md:col-5  mt-10 md:mt-0">
							<div className="space-x-6 md:space-x-20 flex justify-between md:justify-start">
								{footer.footerBottomLinks
									.sort(sortByItemOrderAsc)
									.map((bottomLink, index) => {
										const { link } = bottomLink.customFields
										const isPrivacyTerms = isPrivacyTermsLink(
											link
										)
										return (
											<Fragment key={bottomLink.id}>
												{index ===
													footer.footerBottomLinks
														.length -
														1 && (
													<div className="flex-1 text-center md:hidden">
														&copy;{' '}
														{new Date().getFullYear()}{' '}
														Investa. All rights
														reserved.
													</div>
												)}
												<Link
													className={`flex-shrink-0  ${
														isPrivacyTerms
															? 'text-yellow collapsed collapsed:text-inherit hocus:text-yellow'
															: 'text-inherit hocus:text-inherit'
													}`}
													to={
														isPrivacyTerms
															? '#'
															: link.href
													}
													target={link.target}
													data-target={
														isPrivacyTerms
															? link.href
															: undefined
													}
													onClick={
														isPrivacyTerms
															? handleToggleCollapse
															: undefined
													}
													data-toggle={
														isPrivacyTerms
															? 'collapse'
															: undefined
													}
												>
													{link.text}
												</Link>
											</Fragment>
										)
									})}
							</div>
						</div>
						<div className="hidden md:block md:col-3 space-x-4">
							{renderFooterBottomLogos()}
						</div>
					</div>

					<div className="row items-center">
						<div
							className="md:offset-4 col-12 md:col-4"
							style={{ fontSize: 12, lineHeight: 16 / 12 }}
						>
							<Collapse
								id="privacy"
								content={footer.customFields.privacyContent}
							/>
							<Collapse
								id="terms"
								content={footer.customFields.termsContent}
							/>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}


