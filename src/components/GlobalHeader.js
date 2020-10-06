import React, { Component } from 'react';
import { Link, graphql, StaticQuery } from "gatsby"

import CommonContainer from '@/components/CommonContainer';

export default props => (
	<StaticQuery
		query={graphql`
        query GlobalHeaderQuery {
			agilityGlobalHeader(properties: {referenceName: {eq: "globalheader"}}) {
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
		}

        `}
		render={queryData => {
			const viewModel = {
				item: queryData.agilityGlobalHeader,
				menuLinks: queryData.allAgilitySitemapNode.nodes.filter(sitemapNode => {
					let isTopLevelPage = sitemapNode.path.split('/').length === 2;
					const isThisLanguage = sitemapNode.languageCode === props.languageCode;
					if(props.isMultiLanguage) {
						isTopLevelPage = sitemapNode.path.split('/').length === 3
					}
					//only return nodes from this language and top level links only
					return isThisLanguage && isTopLevelPage
				})
			}
			return (
				<GlobalHeader {...viewModel} />
			);
		}}
	/>
)

class GlobalHeader extends Component {
	renderLinks = () => {
		return this.props.menuLinks.map(node => (
			<div className="flex-auto -mb-2" key={node.pageID}>
				<Link
					to={node.path}
					className="inline-block text-inherit hocus:text-inherit px-7 pb-2 relative border-b-5 border-yellow"
				>
					{node.menuText}
				</Link>
			</div>
		))
	}
	render() {

		return (
			<header>
				<div className="bg-yellow text-text">
					<div className="container-fluid">
						<div className="row">
							<div className="col md:offset-1 flex items-center justify-between">
								<Link
									to="/"
									className="logo-link"
									title={this.props.item.customFields.siteName}
								></Link>
								<a href="tel:1300 123 456" className="inline-flex b-fsregular text-inherit hocus:text-inherit ">
									<span>[icon]</span>
									<span>1300 123 456</span>
								</a>
							</div>
							<div className="col-auto text-white">
								<Link
									to="/contact"
									className="inline-flex bg-black text-inherit hocus:text-inherit py-6 px-13.5 -mr-2.5 font-medium"
								>
									<span>Contact</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="relative">
					<div className="border-b-5 absolute bottom-0 inset-x-0 bg-grey-light"></div>
					<CommonContainer className="pt-4 pb-2 relative">
						<nav className="flex">{this.renderLinks()}</nav>
					</CommonContainer>
				</div>
			</header>
		)
	}
}


