import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

const Link = ({ to, href, children, ...props }) => {
	var isExternal = to.match(/https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i)

	return isExternal ? (
		<a
			href={to}
			rel={isExternal ? 'noopener noreferrer' : undefined}
			{...props}
		>
			{children}
		</a>
	) : (
		<GatsbyLink
			to={to}
			rel={isExternal ? 'noopener noreferrer' : undefined}
			{...props}
		>
			{children}
		</GatsbyLink>
	)
}

export default Link;
