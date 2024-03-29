const agility = require('./src/agility/utils')
const { createRemoteFileNode } = require('gatsby-source-filesystem')

//gatsy-node.js
//CREATE RESOLVERS *******************************************************************************************
exports.createResolvers = args => {
	const {
		createResolvers,
		getNode,
		createNodeId,
		createNode,
		createContentDigest,
		configOptions,
	} = args

	const resolvers = {
		//on the 'agilityPost' node type...
		// agilityPost: {
		// 	//get the sitemap node that represents this item - useful for retrieving the URL for the item
		// 	sitemapNode: agility.getDynamicPageItemSitemapNode(),

		// 	//[Not Implemented]
		// 	//if we had a linked content field for 'author', this is how we'd get the author for this post in a single GraphQl query
		// 	//linkedContent_agilityAuthor: agility.getLinkedContentItem({ type: 'agilityAuthor', linkedContentFieldName: 'author' })
		// },

		agilityGlobalFooter: {
			footerMainLinks: agility.getLinkedContentList({
				type: 'agilityLinkGroup',
				linkedContentFieldName: 'footerMainLinks',
			}),
			footerBottomLinks: agility.getLinkedContentList({
				type: 'agilityLink',
				linkedContentFieldName: 'footerBottomLinks',
			}),
			footerBottomLogos: agility.getLinkedContentList({
				type: 'agilityLinkedImage',
				linkedContentFieldName: 'footerBottomLogos',
			}),
		},

		agilityLinkGroup: {
			linkedContent_agilityLinkItems: agility.getLinkedContentList({
				type: 'agilityLink',
				linkedContentFieldName: 'links',
			}),
		},

		agilityLink: {
			linkedContent_agilityLinkChildren: agility.getLinkedContentList({
				type: 'agilityLink',
				linkedContentFieldName: 'linkChildren',
			}),
		},

		agilityContentTiles: {
			linkedContent_tiles: agility.getLinkedContentList({
				type: 'agilityContentTile',
				linkedContentFieldName: 'tiles',
			}),
		},

		agilityMeetTheTeam: {
			linkedContent_teamTiles: agility.getLinkedContentList({
				type: 'agilityMeetTheTeamTile',
				linkedContentFieldName: 'teamTiles',
			}),
		},

		agilityMaps: {
			linkedContent_mapItems: agility.getLinkedContentList({
				type: 'agilityMapItem',
				linkedContentFieldName: 'mapItems',
			}),
		},

		agilityMapItem: {
			linkedContent_mapKeys: agility.getLinkedContentList({
				type: 'agilityMapItem',
				linkedContentFieldName: 'mapKeys',
			}),
		},

		agilityArticle: {
			//get the sitemap node that represents this item - useful for retrieving the URL for the item
			sitemapNode: agility.getDynamicPageItemSitemapNode(),
			linkedContent_articleType: agility.getLinkedContentItem({
				type: 'agilityArticleType',
				linkedContentFieldName: 'articleType',
			}),
			linkedContent_authors: agility.getLinkedContentList({
				type: 'agilityPerson',
				linkedContentFieldName: 'authors',
			}),
			linkedContent_relatedArticles: agility.getLinkedContentList({
				type: 'agilityArticle',
				linkedContentFieldName: 'relatedArticles',
			}),
		},

		agilityContactOurTeam: {
			linkedContent_teamDetails: agility.getLinkedContentList({
				type: 'agilityContactOurTeamItem',
				linkedContentFieldName: 'teamDetails',
			}),
		},

		agilityBuildingBackgroundedIntro: {
			linkedContent_itemList: agility.getLinkedContentList({
				type: 'agilityBuildingBackgroundIntroItem',
				linkedContentFieldName: 'itemList',
			}),
		},

		agilityHomeHero: {
			linkedContent_slides: agility.getLinkedContentList({
				type: 'agilityHomeHeroItem',
				linkedContentFieldName: 'slides',
			}),
		},

		// [Uncomment if needed]
		// agilityStackPlan: {
		// 	linkedContent_stackPlanOverlays: agility.getLinkedContentList({
		// 		type: 'agilityStackPlanOverlay',
		// 		linkedContentFieldName: 'stackPlanOverlays',
		// 	}),
		// },

		//[Not Implemented]
		//if we had an 'Image Slider' module and it had a list of slides via a linked content field called 'slides', this is how we'd retrieve a list of those slides in a single GraphQL query
		// agilityImageSlider: {
		//     linkedContent_agilitySlides: agility.getLinkedContentList({ type: 'agilitySlide', linkedContentFieldName: 'slides' })
		// }
	}
	createResolvers(resolvers)
}

exports.onCreateNode = async ({
	node,
	actions: { createNode },
	store,
	cache,
	createNodeId,
}) => {
	// For all Agility nodes that have an attachment field, call createRemoteFileNode
	if (
		node.internal.type.indexOf(`agility`) > -1 &&
		node.customFields &&
		node.internal.type.indexOf(`agilitypage`) == -1 &&
			node.internal.type.indexOf(`agilitystate`) == -1 &&
			node.internal.type.indexOf(`agilitysitemap`) == -1 &&
			node.internal.type.indexOf(`agilitynestedsitemap`) == -1 &&
			node.internal.type.indexOf(`agilitySitemapNode`) == -1 &&
			node.internal.type.indexOf(`agilityitem`) == -1
	) {
		const customFields = Object.keys(node.customFields)
		await asyncForEach(customFields, async field => {
			if (!node.customFields[field]) {
				return
			}
			const fieldKeys = Object.keys(node.customFields[field])
			if (
				fieldKeys.includes(`url`) &&
				fieldKeys.includes(`pixelHeight`) &&
				fieldKeys.includes(`pixelWidth`) &&
				fieldKeys.includes(`width`) &&
				fieldKeys.includes(`height`)
			) {
				console.log(`found ${field} on ${node.internal.type}`)
				try{
					let fileNode = await createRemoteFileNode({
						url: node.customFields?.[field]?.url?.replace(/\ /g, '%20'), // string that points to the URL of the image
						parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
						createNode, // helper function in gatsby-node to generate the node
						createNodeId, // helper function in gatsby-node to generate the node id
						cache, // Gatsby's cache
						store, // Gatsby's redux store
					})
					// if the file was created, attach the new node to the parent node
					if (fileNode) {
						node.customFields[`${field}LocalImg___NODE`] = fileNode.id
					}
				} catch (e){
					console.log(e)
				}
			}
		})
	}
}

const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array)
	}
}

// put this on gatsby-node.js file
exports.onCreateWebpackConfig = ({
	stage,
	rules,
	loaders,
	plugins,
	actions,
}) => {
	actions.setWebpackConfig({
		resolve: {
			modules: ['node_modules'],
			alias: {
				TweenMax: 'gsap/umd/TweenMax.js',
				TweenLite: 'gsap/umd/TweenLite.js',
				TimelineMax: 'gsap/umd/TimelineMax.js',
				ScrollMagic:
					'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
				'animation.gsap':
					'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js',
				'debug.addIndicators':
					'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js',
			},
		},
	})
}
