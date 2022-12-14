import React from 'react'
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from 'gatsby'
import parseHTML from 'react-html-parser'


const PARSE_HTML_OPTIONS = {
	transform: function transform(node, index) {
		if (node.type === 'script') {
			return (
				<script key={index} src={node?.attribs?.src}>
					{node?.children[0]?.data}
				</script>
			)
		}
	},
 }


export function getDomNode(html) {
	const cleanedValue = html?.replace(/(\n|\r)+/, '') || ''
	return parseHTML(cleanedValue, PARSE_HTML_OPTIONS)
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

	console.log('sssssss', scripts.top)

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

