require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

console.log(process.env.NODE_ENV);
const path = require('path')
const magicImporter = require("node-sass-magic-importer")

//configure your agility plugin with environment variables so that
//your agility api credentials stay secure
const agilityConfig = {
  guid: process.env.AGILITY_GUID,
  apiKey: process.env.AGILITY_API_KEY,
  isPreview: process.env.AGILITY_API_ISPREVIEW
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
				postCssPlugins: [require('tailwindcss')],
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
		{
			resolve: `gatsby-plugin-purgecss`,
			options: {
				printRejected: true, // Print removed selectors and processed file names
				// develop: true, // Enable while using `gatsby develop`
				// tailwind: true, // Enable tailwindcss support
				// whitelist: ['whitelist'], // Don't remove this selector
				// ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
				// purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
			},
		},
	],
}
