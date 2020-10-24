import React from 'react';
import { graphql, useStaticQuery } from 'gatsby'
import Loadable from '@loadable/component'
const Recaptcha = Loadable(() => import('react-google-recaptcha'))

const SiteRecaptcha = ({ sitekey, size="invisible", tabindex, propRef, ...props }) => {
	const { agilityGlobalSettings } = useStaticQuery(graphql`
		query GlobalSettingsQuery {
			agilityGlobalSettings(
				properties: { referenceName: { eq: "globalsettings" } }
			) {
				customFields {
					recaptchaSiteKey
				}
			}
		}
	`)

	return (
		<Recaptcha
			{...props}
			ref={propRef}
			tabindex={typeof tabindex !== 'undefined' ? tabindex : -1}
			size={size}
			sitekey={
				sitekey || agilityGlobalSettings.customFields.recaptchaSiteKey
			}
		></Recaptcha>
	)
}

export default SiteRecaptcha;
