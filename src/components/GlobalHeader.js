import React, { Component } from 'react';
import { graphql, StaticQuery } from "gatsby"

import Link from '@/components/Link'
import CommonContainer from '@/components/CommonContainer';

export default props => (
	<StaticQuery
		query={graphql`
			query GlobalHeaderQuery {
				agilityGlobalHeader(
					properties: { referenceName: { eq: "globalheader" } }
				) {
					customFields {
						siteName
						logo {
							url
							filesize
							pixelHeight
							pixelWidth
						}
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
			}
		`}
		render={queryData => {
			const viewModel = {
				item: queryData.agilityGlobalHeader,
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
			return <GlobalHeader {...viewModel} />
		}}
	/>
)

class GlobalHeader extends Component {
	renderLinks = () => {
		return this.props.menuLinks
			.filter(node => node.path !== '/' && node.path !== '/home')
			.map(node => (
				<div className="flex-auto -mb-2" key={node.pageID}>
					<Link
						to={node.path}
						className="inline-flex flex-col text-inherit hocus:text-inherit px-7 pb-4 b-fsnav group relative overflow-hidden"
						activeClassName="active"
					>
						{node.menuText}
						<div className="-translate-x-full bg-yellow transition duration-500 delay-200 absolute left-0 h-1 bottom-0 w-full group-active:translate-x-0"></div>
					</Link>
				</div>
			))
	}
	render() {
		const { item } = this.props;
		return (
			<header>
				<div className="bg-yellow text-text">
					<div className="container-fluid">
						<div className="row">
							<div className="col md:offset-1 flex items-center justify-between">
								<Link
									to="/"
									className="logo-link"
									title={
										item.customFields.siteName
									}
								>
									<img
										alt="Logo"
										src={item.customFields.logo.url}
									/>
								</Link>
								<a
									href="tel:1300 123 456"
									className="inline-flex items-center space-x-4 b-fsregular text-inherit hocus:text-inherit"
								>
									<svg
										width="31"
										height="30"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											clipRule="evenodd"
											d="M30 15c0 8.008-6.492 14.5-14.5 14.5S1 23.008 1 15 7.492.5 15.5.5 30 6.992 30 15z"
											stroke="currentColor"
											strokeLinecap="round"
										/>
										<path
											clipRule="evenodd"
											d="M11.813 18.96c4.216 4.215 9.213 5.1 10.87 5.01a20.889 20.889 0 002.483-4.352c-.956-1.165-3.526-2.458-4.713-2.76l-1.583 1.65c-.72-.216-2.31-.66-4.128-2.478-1.817-1.818-2.221-3.368-2.436-4.087l1.608-1.624c-.5-1.713-1.711-3.573-2.76-4.713A20.889 20.889 0 006.802 8.09c-.09 1.658.795 6.654 5.01 10.87z"
											stroke="currentColor"
											strokeLinecap="round"
										/>
									</svg>
									<span>1300 123 456</span>
								</a>
							</div>
							<div className="col-auto text-white">
								<Link
									to="/contact"
									className="inline-flex items-center space-x-4 bg-black text-inherit hocus:no-underline hocus:text-black hocus:bg-grey-light py-6 px-13.5 -mr-2.5 font-medium transition duration-300"
								>
									<svg
										width="36"
										height="26"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											clipRule="evenodd"
											d="M35.06 23.452c0 .855-.693 1.548-1.548 1.548H2.549A1.549 1.549 0 011 23.452V2.549C1 1.693 1.694 1 2.549 1h30.963c.855 0 1.548.693 1.548 1.549v20.903z"
											stroke="currentColor"
										/>
										<path
											d="M33.092 3.675a.5.5 0 00-.707-.707l.707.707zM21.862 14.2l-.354-.353.354.353zm-7.663 0l.353-.353-.353.353zM4.449 3.742a.5.5 0 00-.707.707l.707-.707zM3.742 21.55a.5.5 0 10.707.707l-.707-.707zm7.674-6.261a.5.5 0 00-.707-.707l.707.707zm20.195 6.968a.5.5 0 00.707-.707l-.707.707zm-6.26-7.675a.5.5 0 00-.707.707l.707-.707zm7.034-11.615L21.508 13.847l.707.707 10.877-10.88-.707-.706zM21.508 13.847a4.917 4.917 0 01-6.956 0l-.707.707a5.917 5.917 0 008.37 0l-.707-.707zm-6.956 0L4.45 3.742l-.707.707 10.103 10.105.707-.707zM4.45 22.257l6.967-6.967-.707-.707-6.967 6.968.707.707zm27.87-.706l-6.968-6.968-.707.707 6.967 6.968.707-.707z"
											fill="currentColor"
										/>
									</svg>
									<span>Contact</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="relative">
					<div className="border-b-4 absolute bottom-0 inset-x-0 bg-grey-light"></div>
					<CommonContainer className="pt-4 pb-2 relative">
						<nav className="flex -ml-7 ">{this.renderLinks()}</nav>
					</CommonContainer>
				</div>
			</header>
		)
	}
}


