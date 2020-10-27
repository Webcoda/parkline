const React = require('react');

exports.onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
	setPostBodyComponents([
       <script key="polyfill" src="https://cdn.polyfill.io/v3/polyfill.min.js?features=default,es6,matchMedia,Object.entries,Array.prototype.includes,Element.prototype.dataset,IntersectionObserver,fetch"></script>,
       <script key="addthis" src="https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f8fb8ab542d3c38" async="async"></script>,
	]);
}
