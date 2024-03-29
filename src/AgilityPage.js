import React, { useEffect } from 'react'
import { graphql } from "gatsby"
import agilityUtils from './agility/utils'
import AgilityPageTemplate from './agility/components/AgilityPageTemplate'
//Some things we need for our layout
import LayoutTemplate from "./components/LayoutTemplate"
import PreviewBar from "./components/PreviewBar"
import GlobalHeader from './components/GlobalHeader'
import GlobalFooter from './components/GlobalFooter'
import SEO from './components/SEO'


//Our query to get the our page data and check for a dynamic page item (agilityItem)
export const query = graphql`
  query($pageID: Int!, $contentID: Int!, $languageCode: String!) {

    agilitypage(languageCode: { eq: $languageCode }, itemID: { eq: $pageID }) {
        pageJson
	}
    agilityitem(languageCode: {eq: $languageCode}, itemID: {eq: $contentID}) {
		itemJson
    }
}
`
const AgilityPage = ({ pageContext, data }) => {
	const viewModel = agilityUtils.buildPageViewModel({ pageContext, data });

	useEffect(() => {
		document.querySelector('html').classList.remove('is-menu-active')
	})

    return (
		<LayoutTemplate className={`page-${viewModel.page.name}`}>
			<SEO pageData={viewModel.page} />
			<PreviewBar isPreview={viewModel.isPreview} />
			<GlobalHeader
				languageCode={viewModel.languageCode}
				isMultiLanguage={viewModel.isMultiLanguage}
			/>
			<main className="main">
				<AgilityPageTemplate {...viewModel} />
			</main>
			<GlobalFooter
				languageCode={viewModel.languageCode}
				isMultiLanguage={viewModel.isMultiLanguage}
			/>
			{!!viewModel.page.scripts.bottom  && (
				<div
					dangerouslySetInnerHTML={{
						__html: viewModel.page.scripts.bottom,
					}}
				></div>
			)}
		</LayoutTemplate>
	)
}

export default AgilityPage;


