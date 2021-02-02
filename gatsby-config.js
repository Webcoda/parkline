require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})

console.log(process.env.NODE_ENV)
console.log(process.env.AGILITY_API_KEY)
console.log(process.env.AGILITY_API_ISPREVIEW)

const path = require('path')
const magicImporter = require('node-sass-magic-importer')

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
				// sass-loader v7.x
				data: `
					@import "./src/styles/01_settings/**/*.scss";
					@import "./src/styles/02_tools/**/*.scss";
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
				importer: magicImporter(),

				// sass-loader v8.x
				// prependData: `
				// 	@import "./styles/01_settings/**/*.scss";
				// 	@import "./styles/02_tools/**/*.scss";
				// `,
				// sassOptions: {
				// 	importer: magicImporter(),
				// },
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
		// 	resolve: `gatsby-plugin-google-analytics`,
		// 	options: {
		// 		// The property ID; the tracking code won't be generated without it
		// 		trackingId: 'G-RJ05ZBWY2Q',
		// 		// Defines where to place the tracking script - `true` in the head and `false` in the body
		// 		head: true,
		// 		// // Setting this parameter is optional
		// 		// anonymize: true,
		// 		// // Setting this parameter is also optional
		// 		// respectDNT: true,
		// 		// // Avoids sending pageview hits from custom paths
		// 		// exclude: ['/preview/**', '/do-not-track/me/too/'],
		// 		// // Delays sending pageview hits on route update (in milliseconds)
		// 		// pageTransitionDelay: 0,
		// 		// // Enables Google Optimize using your container Id
		// 		// optimizeId: 'YOUR_GOOGLE_OPTIMIZE_TRACKING_ID',
		// 		// // Enables Google Optimize Experiment ID
		// 		// experimentId: 'YOUR_GOOGLE_EXPERIMENT_ID',
		// 		// // Set Variation ID. 0 for original 1,2,3....
		// 		// variationId: 'YOUR_GOOGLE_OPTIMIZE_VARIATION_ID',
		// 		// // Defers execution of google analytics script after page load
		// 		// defer: false,
		// 		// // Any additional optional fields
		// 		// sampleRate: 5,
		// 		// siteSpeedSampleRate: 10,
		// 		// cookieDomain: 'example.com',
		// 	},
		// },
		// {
		// 	resolve: 'gatsby-plugin-google-tagmanager',
		// 	options: {
		// 		id: 'G-RJ05ZBWY2Q',

		// 		// Include GTM in development.
		// 		//
		// 		// Defaults to false meaning GTM will only be loaded in production.
		// 		includeInDevelopment: false,

		// 		// datalayer to be set before GTM is loaded
		// 		// should be an object or a function that is executed in the browser
		// 		//
		// 		// Defaults to null
		// 		defaultDataLayer: { platform: 'gatsby' },

		// 		// Specify optional GTM environment details.
		// 		// gtmAuth: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING',
		// 		// gtmPreview: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME',
		// 		// dataLayerName: 'YOUR_DATA_LAYER_NAME',

		// 		// Name of the event that is triggered
		// 		// on every Gatsby route change.
		// 		//
		// 		// Defaults to gatsby-route-change
		// 		// routeChangeEventName: 'YOUR_ROUTE_CHANGE_EVENT_NAME',
		// 	},
		// },
	],
}
