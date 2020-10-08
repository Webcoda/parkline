import React, { Component, Fragment } from 'react';
import { Link, graphql, StaticQuery } from "gatsby"

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
						linkedContent_agilityLinkItems {
							customFields {
								url {
									href
									target
									text
								}
							}
							linkedContent_agilityLinkChildren {
								customFields {
									url {
										href
										target
										text
									}
								}
							}
						}
					}
					footerBottomLinks {
						customFields {
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

class GlobalFooter extends Component {
	render() {
		const { footer } = this.props;

		return (
			<footer className="bg-grey-light border-t-5 border-yellow">
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
									<Fragment
										key={group.id}
									>
										{group?.linkedContent_agilityLinkItems.map(
											linkItem => {
												const parentTo = linkItem?.customFields.url?.href;
												const parentTarget = linkItem?.customFields.url?.target;
												const parentText = linkItem?.customFields.url?.Text;

												return (
													<div
														key={linkItem.id}
														className="col"
													>
														<div className="font-bold mb-2">
															<Link
																className="text-inherit hocus:text-inherit"
																to={parentTo}
																target={parentTarget}
															>
																{
																	parentText
																}
															</Link>
														</div>
														{
															<div className="mt-2 space-y-2">
																{linkItem?.linkedContent_agilityLinkChildren.map(
																	childLinkItem => {
																		const to =
																			childLinkItem
																				.customFields
																				.url
																				?.href
																		const target =
																			childLinkItem
																				.customFields
																				.url
																				?.target
																		const text =
																			childLinkItem
																				.customFields
																				.url
																				?.text

																		return (
																			<div
																				key={childLinkItem.id}
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
													.replace(
														/\r\n\r\n/g,
														'<br>'
													)
													.replace(
														/<p><\/p>/g,
														'<br>'
													),
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
					<div className="container-fluid">
						<div className="row justify-center">
							<div className="col-10">
								&copy; 2020 Investa. All rights reserved.
							</div>
						</div>
					</div>
				</div>
			</footer>
		)
	}
}


