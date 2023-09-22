require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})

console.log("🚀 ~ file: gatsby-config.js:6 ~ process.env.NODE_ENV:", process.env.NODE_ENV)
console.log("🚀 ~ file: gatsby-config.js:7 ~ process.env.AGILITY_API_KEY:", process.env.AGILITY_API_KEY)
console.log("🚀 ~ file: gatsby-config.js:8 ~ process.env.AGILITY_API_ISPREVIEW:", process.env.AGILITY_API_ISPREVIEW)

const path = require('path')

//configure your agility plugin with environment variables so that
//your agility api credentials stay secure
const agilityConfig = {
	guid: process.env.AGILITY_GUID,
	apiKey: process.env.AGILITY_API_KEY,
	isPreview: process.env.AGILITY_API_ISPREVIEW,
}

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	siteMetadata: {
		title: 'Investa Parkline',
	},
	plugins: [
		`gatsby-plugin-netlify`,
		`gatsby-plugin-react-helmet`,
		{
			//the name of the plugin
			resolve: '@agility/gatsby-source-agilitycms',
			//the options for our plugin
			options: {
				//your Agility Content Fetch API Guid
				guid: agilityConfig.guid,
				//your Agility Content Fetch API Key
				apiKey: agilityConfig.apiKey,
				//set this to true if you are using the preview API Key
				isPreview: agilityConfig.isPreview,
				//set this to true to see expanded traces in the build logs
				debug: false,
				//the languages you want to source content for
				languages: [
					{
						// The name of the language code
						name: 'English',
						// The actual language code set in Agility CMS
						code: 'en-us',
						// The name to be used in the URL path that represents the current language
						path: 'en',
					},
				],
				// The channels you want to include
				channels: [
					{
						// The reference name for the website channel as it is defined in Agility CMS
						referenceName: 'website',
					},
				],
				//the page template that will be used to render Agility CMS pages
				masterPageTemplate: './src/AgilityPage.js',
			},
		},
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		{
			resolve: `gatsby-source-filesystem`,
			options: { name: `images`, path: `./src/img/` },
		},
		// {
		// 	resolve: `gatsby-plugin-sitemap`,
		// 	options: {
		// 		output: `/sitemap.xml`,
		// 		//exclude: [`/category/*`, `/path/to/page`],

		// 		query: `
		// 		{
		// 			allSitePage:allAgilitySitemapNode(filter: {visible: {sitemap: {eq: true}}}) {
		// 				edges {
		// 				  node {
		// 					path
		// 				  }
		// 				}
		// 			  }
		// 			  site {
		// 				siteMetadata {
		// 				  siteUrl
		// 				}
		// 			}
		// 		}`,
		// 	},
		// },
		{
			resolve: `gatsby-plugin-alias-imports`,
			options: {
				alias: {
					'@': path.resolve(__dirname, 'src'),
					'@@': path.resolve(__dirname, 'src'),
					// the ScrollMagic alias needed for debug indicators when running define(['ScrollMagic'], factory)
					ScrollMagic:
						'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
					TweenMax: 'gsap/umd/TweenMax.js',
					TweenLite: 'gsap/umd/TweenLite.js',
					TimelineMax: 'gsap/umd/TimelineMax.js',
				},
			},
		},
		// {
		//   resolve: `gatsby-plugin-manifest`,
		//   options: {
		//     name: `Parkline`,
		//     short_name: `Parkline short`,
		//     start_url: `/`,
		//     background_color: `#663399`,
		//     theme_color: `#663399`,
		//     display: `minimal-ui`,
		//     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
		//   },
		// },
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				additionalData: `
					@import "./src/styles/01_settings/_settings.bootstrap";
					@import "./src/styles/01_settings/_settings.fonts";
					@import "./src/styles/01_settings/_settings.hamburgers";

					@import "./src/styles/02_tools/02.01_functions/_tools.function.color";
					@import "./src/styles/02_tools/02.01_functions/_tools.function.em";
					@import "./src/styles/02_tools/02.01_functions/_tools.function.mq";
					@import "./src/styles/02_tools/02.01_functions/_tools.function.rem";
					@import "./src/styles/02_tools/02.01_functions/_tools.function.spriteurl";
					@import "./src/styles/02_tools/02.01_functions/_tools.function.str-replace";

					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.bgimg-with-ratio";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.bootstrap-flex-grid";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.bootstrap-grid";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.btn-unstyled";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.color";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.ellipsis";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.font-face";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.fontstyles";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.foundation";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.fp";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.guttergapclass";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.icon";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.input-unstyled";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.list-unstyled";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.maintain-ratio";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.mq";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.sprite";
					@import "./src/styles/02_tools/02.02_mixins/_tools.mixin.zindex";
				`,
				postCssPlugins: [
					require('tailwindcss'),
					require('autoprefixer')(),
					require('rucksack-css')(),
					require('postcss-pxtorem')(),
					// require('cssnano')({
					// 	rebase: false,
					// 	// discardComments: {
					// 	// 	removeAll: true,
					// 	// },
					// 	discardUnused: false,
					// 	minifyFontValues: true,
					// 	filterOptimiser: true,
					// 	functionOptimiser: true,
					// 	minifyParams: true,
					// 	normalizeUrl: true,
					// 	reduceBackgroundRepeat: true,
					// 	convertValues: true,
					// 	discardEmpty: true,
					// 	minifySelectors: true,
					// 	reduceInitial: true,
					// 	reduceIdents: false,
					// 	mergeRules: false,
					// 	zindex: false,
					// }),
				],
			},
		},
		// {
		// 	resolve: `gatsby-plugin-purgecss`,
		// 	options: {
		// 		content: [
		// 			path.join(process.cwd(), 'src/**/!(*.d).{ts,js,jsx,tsx}'),
		// 		],
		// 		whitelistPatterns: [/swiper-/],
		// 		printRejected: true, // Print removed selectors and processed file names
		// 		tailwind: true, // Enable tailwindcss support
		// 		// develop: true, // Enable while using `gatsby develop`
		// 		// whitelist: ['whitelist'], // Don't remove this selector
		// 		// ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
		// 		// purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
		// 		defaultExtractor: function(){
		// 			// Capture as liberally as possible, including things like `h-(screen-1.5)`
		// 			const broadMatches =
		// 				content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

		// 			// Capture classes within other delimiters like .block(class="w-1/2") in Pug
		// 			const innerMatches =
		// 				content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []

		// 			return broadMatches.concat(innerMatches)
		// 		},
		// 	},
		// },
		// {
		// 	resolve: `gatsby-plugin-google-gtag`,
		// 	options: {
		// 		// You can add multiple tracking ids and a pageview event will be fired for all of them.
		// 		trackingIds: ['GTM-N88Z6B4'],
		// 	},
		// },
		{
			resolve: 'gatsby-plugin-google-tagmanager-timeout',
			options: {
				id: 'GTM-N88Z6B4',
			},
		},
	],
}
