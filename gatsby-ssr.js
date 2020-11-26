// const React = require('react');

exports.onRenderBody = ({ setHtmlAttributes }) => {
	setHtmlAttributes({
		lang: 'en',
		class: 'no-js overflow-hidden'
	})
}
