import React, { Component } from 'react';
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
				menuLinks: queryData.allAgilitySitemapNode.nodes.filter(
					sitemapNode => {
						let isTopLevelPage =
							sitemapNode.path.split('/').length === 2
						const isThisLanguage =
							sitemapNode.languageCode === props.languageCode
						if (props.isMultiLanguage) {
							isTopLevelPage =
								sitemapNode.path.split('/').length === 3
						}
						//only return nodes from this language and top level links only
						return isThisLanguage && isTopLevelPage
					}
				),
			}
			return <GlobalFooter {...viewModel} />
		}}
	/>
)

class GlobalFooter extends Component {
	renderLinks = () => {

		let links = [];
		this.props.menuLinks.forEach(node => {
			links.push(<li key={node.pageID}><Link to={node.path}>{node.menuText}</Link></li>)
		})
		return links;
	}
	render() {
		const { footer } = this.props;

		console.log(footer.footerMainLinks)
		return (
			<footer className="bg-grey-light border-t-5 border-yellow">
				<CommonContainer className="flex pt-12 pb-14">
					<div className="row w-full">
						<div className="col-4">
							<Link to="/" className="logo-link"></Link>
						</div>
						<div className="col-6">
							<div className="row">
								{footer.footerMainLinks?.map(group => (
									<>
										{group?.linkedContent_agilityLinkItems.map(
											linkItem => (
												<div className="col">
													<div className="font-bold mb-2">
														<Link
															to={
																linkItem
																	?.customFields
																	.url.href
															}
															target={
																linkItem
																	?.customFields
																	.url.target
															}
														>
															{
																linkItem
																	?.customFields
																	.url.text
															}
														</Link>
													</div>
													{
														<div className="mt-2 space-y-2">
															{linkItem?.linkedContent_agilityLinkChildren.map(
																childLinkItem => (
																	<div className="small text-inherit">
																		<Link
																			className="text-inherit"
																			to={
																				childLinkItem
																					?.customFields
																					.url
																					.href
																			}
																			target={
																				childLinkItem
																					?.customFields
																					.url
																					.target
																			}
																		>
																			{
																				childLinkItem
																					?.customFields
																					.url
																					.text
																			}
																		</Link>
																	</div>
																)
															)}
														</div>
													}
												</div>
											)
										)}
									</>
								))}
								<div className="col">
									{!!footer.customFields.contactTitle && (
										<div className="b-fsregular font-bold mb-4">
											{footer.customFields.contactTitle}
										</div>
									)}
									{!!footer.customFields.contactInfo && (
										<div
											className="small font-normal"
											dangerouslySetInnerHTML={{
												__html:
													footer.customFields.contactInfo
														.replace(/\<p\>\<\/p\>/g, '')
														.replace(/\r\n\r\n/g,'<br>')
											}}
										>
										</div>
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
										type="button"
										className="w-9.5 h-9.5 bg-yellow flex-shrink-0"
										aria-label="Submit"
									></button>
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


