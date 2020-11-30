import React from 'react'
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from 'gatsby'

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
			{!!scripts.top && (
				<div dangerouslySetInnerHTML={{ __html: scripts.top }} />
			)}
			{!!seo.metaHTML && (
				<div dangerouslySetInnerHTML={{ __html: seo.metaHTML }} />
			)}
		</Helmet>
	)
}

export default SEO;

