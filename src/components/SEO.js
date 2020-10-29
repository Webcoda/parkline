import React from 'react'
import { Helmet } from "react-helmet"

const SEO = ({ pageData }) => {
	if(!pageData) return null;

	const { title, scripts, seo } = pageData

    return (
		<Helmet
			title={`${title}  - Investa Parkline`}
			meta={[
				{
					name: `description`,
					content: seo.metaDescription,
				},
			]}
		>
			{
				!!scripts.top && (
					<div dangerouslySetInnerHTML={{ __html: scripts.top }} />
				)
			}
			{
				!!seo.metaHTML && (
					<div dangerouslySetInnerHTML={{ __html: seo.metaHTML }} />
				)
			}
		</Helmet>
	)
}

export default SEO;

