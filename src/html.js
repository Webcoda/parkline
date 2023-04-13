import React from "react"
import PropTypes from "prop-types"
import Preloader from '@/components/Preloader'

export default function HTML(props) {
	return (
		<html {...props.htmlAttributes}>
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<script
					id="Cookiebot"
					src="https://consent.cookiebot.com/uc.js"
					data-cbid="f3c749fd-4173-4eac-9d9a-39ff6abb28d0"
					type="text/javascript"
					async
				></script>
				{props.headComponents}
			</head>
			<body {...props.bodyAttributes}>
				{props.preBodyComponents}
				<Preloader />
				<div
					key={`body`}
					id="___gatsby"
					dangerouslySetInnerHTML={{ __html: props.body }}
				/>
				{props.postBodyComponents}
				<script src="https://cdn.polyfill.io/v3/polyfill.min.js?features=default,es6,matchMedia,Object.entries,Array.prototype.includes,Element.prototype.dataset,IntersectionObserver,fetch"></script>
				<script
					src="https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f8fb8ab542d3c38"
					async="async"
				></script>
			</body>
		</html>
	)
}

HTML.propTypes = {
	htmlAttributes: PropTypes.object,
	headComponents: PropTypes.array,
	bodyAttributes: PropTypes.object,
	preBodyComponents: PropTypes.array,
	body: PropTypes.string,
	postBodyComponents: PropTypes.array,
}
