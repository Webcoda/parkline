import React from 'react'
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from 'gatsby'
import parseHTML from 'html-react-parser'

export function getDomNode(
	html
) {
	const cleanedValue = html?.replace(/(\n|\r)+/, '') || ''
	const x =  parseHTML(cleanedValue)
	console.log("🚀 ~ file: SEO.js:11 ~ x", x)
	return x
}

const SEO = ({ pageData }) => {
	const { agilityGlobalHeader } = useStaticQuery(graphql`
		query GlobalHeaderQueryForSEO {
			agilityGlobalHeader(
				properties: { referenceName: { eq: "globalheader" } }
			) {
				customFields {
					siteName
				}
			}
		}
	`)

	if(!pageData) return null;

	const { title, scripts, seo } = pageData

    return (
		<Helmet
			title={`${title}  - ${agilityGlobalHeader.customFields.siteName}`}
			meta={[
				{
					name: `description`,
					content: seo.metaDescription,
				},
			]}
		>
			{/* For some reasons, it needs a tag to make the scripts.top and seo.metaHTML rendered */}
			<meta name="dummy-meta" content=''/>
			{!!scripts.top && (
				getDomNode(scripts.top)
			)}
			{!!seo.metaHTML && (
				getDomNode(seo.metaHTML)
			)}
		</Helmet>
	)
}

export default SEO;

