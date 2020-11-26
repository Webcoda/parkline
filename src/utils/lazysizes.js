// Note for lazysizes
// Need to do "mobile size first"
// If you define bgset="imageA sizeA, imageB sizeB", then if the B is loaded first, the A won't load although it matches the size requirement
// If you define bgset="imageA sizeA, imageB sizeB", then if the A is loaded first, B will load if it matches the size requirement

// To define with media query, do the ones that have mediaquery first, then the ones without
// If you define with media query, it will load based on the set media query
import lazysizes from 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange'
import 'lazysizes/plugins/bgset/ls.bgset'
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks'
import 'lazysizes/plugins/blur-up/ls.blur-up'

lazysizes.cfg = lazysizes.cfg || {}
lazysizes.cfg.lazyClass = 'js-lazysizes'
lazysizes.cfg.loadedClass = 'is-lazysizes-loaded'
lazysizes.cfg.loadingClass = 'is-lazysizes-loading'

//page is optimized for fast onload event
lazysizes.cfg.loadMode = 1

lazysizes.cfg.customMedia = {
	'--xxs-portrait': '(max-width: 479px) and (orientation: portrait)',
	'--xxs': '(max-width: 479px)',
	'--xs-portrait': '(max-width: 767px) and (orientation: portrait)',
	'--xs': '(max-width: 767px)',
	'--sm-portrait': '(max-width: 991px) and (orientation: portrait)',
	'--sm': '(max-width: 991px)',
	'--md-portrait': '(max-width: 1179px) and (orientation: portrait)',
	'--md': '(max-width: 1179px)',
	'--lg': '(max-width: 1399px)',
}


if (document.querySelector('html').classList.contains('is-IE')) {
	/* eslint-disable */
	import('lazysizes/plugins/respimg/ls.respimg')
	import('lazysizes/plugins/object-fit/ls.object-fit')

	// (async () => {
	// 	const { default: objectFitVideos } = await import('object-fit-videos')
	// 	objectFitVideos()
	// })()
}

export default lazysizes
