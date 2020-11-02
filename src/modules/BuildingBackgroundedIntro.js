import React from 'react';
import { graphql, useStaticQuery } from "gatsby";
import Richtext from "@/components/Richtext";
import BaseImg from '@/components/BaseImg'
import { sortByItemOrderAsc } from "@/utils/sortByItemOrder";
import './BuildingBackgroundedIntro.scss'

const BuildingBackgroundedIntro = ({ item }) => {
	const { allAgilityBuildingBackgroundedIntro } = useStaticQuery(
		graphql`
			query BuildingBackgroundIntroQuery {
				allAgilityBuildingBackgroundedIntro {
					nodes {
						linkedContent_itemList {
							id
							customFields {
								content
								isSmallSection
								title
								image {
									url
								}
								mediaPosition
								textAlignment
							}
							properties {
								itemOrder
								referenceName
							}
						}
						properties {
							referenceName
						}
					}
				}
			}
		`
	)

	const buildingBackgroundIntro = allAgilityBuildingBackgroundedIntro.nodes.find(node => node.properties.referenceName === item.properties.referenceName)

	return buildingBackgroundIntro ? (
		<div className="c-buildingbackgroundedintro">
			<div
				className="bg-grey-light u-bgimg md:pb-0 space-y-15 md:space-y-30 js-lazysizes container-fluid c-buildingbackgroundedintro__bigsection"
				data-bgset="/building-background-intro-background.svg"
			>
				{buildingBackgroundIntro.linkedContent_itemList
					?.filter(
						buildingBackgroundIntroItem =>
							buildingBackgroundIntroItem.customFields
								.isSmallSection !== 'true'
					)
					.sort(sortByItemOrderAsc)
					.map(buildingBackgroundIntroItem => {
						const {
							title,
							content,
							mediaPosition,
							textAlignment,
							image,
						} = buildingBackgroundIntroItem.customFields
						const isMediaOnTheLeft = mediaPosition === 'left'

						// if left image
						const colMediaClass = isMediaOnTheLeft
							? '-ml-5 md:-ml-2.5 col-9 md:col-5'
							: '-mr-5 offset-3 md:offset-1 col-9 md:col-4 md:mr-1/12'
						const colTextClass = isMediaOnTheLeft
							? 'md:offset-1 md:col-5'
							: 'md:offset-1 md:col-5'

						let textAlignmentClass = ''
						switch (textAlignment) {
							case 'center':
								textAlignmentClass = 'items-center'
								break
							default:
								break
						}

						const mediaImgSources = [
							{
								srcset: [
									{
										src: image.url + '?w=2560',
										descriptor: '2560w',
									},
									{
										src: image.url + '?w=1920',
										descriptor: '1920w',
									},
									{
										src: image.url + '?w=1024',
										descriptor: '1024w',
									},
									{
										src: image.url + '?w=768',
										descriptor: '768w',
									},
									{
										src: image.url + '?w=480',
										descriptor: '480w',
									},
								],
								type: 'image/png',
							},
						]

						return (
							<div
								key={buildingBackgroundIntroItem.id}
								className={`row ${textAlignmentClass} ${
									isMediaOnTheLeft
										? 'is-media-left'
										: 'is-media-right flex-row-reverse'
								} c-buildingbackgroundedintro__bigsection-row`}
								data-aos="fade-up"
							>
								{/* left image */}
								<div
									className={`${colMediaClass} mb-15 md:mb-0 c-buildingbackgroundedintro__bigsection-col-media`}
								>
									{!!image?.url && (
										<BaseImg sources={mediaImgSources} />
									)}
								</div>
								<div className={colTextClass}>
									<h2 className="md:h1 mb-5 md:mb-11 max-w-3/4">
										{title}
									</h2>
									<Richtext html={content} />
								</div>
							</div>
						)
					})}
			</div>

			{/* Small section */}
			<div className="container-fluid space-y-30 c-buildingbackgroundedintro__smallsection">
				{buildingBackgroundIntro.linkedContent_itemList
					?.filter(
						buildingBackgroundIntroItem =>
							buildingBackgroundIntroItem.customFields
								.isSmallSection === 'true'
					)
					.sort(sortByItemOrderAsc)
					.map(buildingBackgroundIntroItem => {
						const {
							title,
							content,
							mediaPosition,
							textAlignment,
							image,
						} = buildingBackgroundIntroItem.customFields
						const isMediaOnTheLeft = mediaPosition === 'left'

						// if left image
						const colMediaClass = isMediaOnTheLeft
							? 'md:offset-1 md:col-4'
							: 'md:offset-1 md:col-4'
						const colTextClass = isMediaOnTheLeft
							? 'md:offset-1 md:col-4'
							: 'md:offset-1 md:col-4'

						let textAlignmentClass = ''
						switch (textAlignment) {
							case 'bottom':
								textAlignmentClass = 'items-end'
								break
							case 'center':
								textAlignmentClass = 'items-center'
								break
							default:
								break
						}

						const mediaImgSources = [
							{
								srcset: [
									{
										src: image.url + '?w=2560',
										descriptor: '2560w',
									},
									{
										src: image.url + '?w=1920',
										descriptor: '1920w',
									},
									{
										src: image.url + '?w=1024',
										descriptor: '1024w',
									},
									{
										src: image.url + '?w=768',
										descriptor: '768w',
									},
									{
										src: image.url + '?w=480',
										descriptor: '480w',
									},
								],
								type: 'image/png',
							},
						]

						return (
							<div
								key={buildingBackgroundIntroItem.id}
								className={`row ${textAlignmentClass} ${
									isMediaOnTheLeft
										? 'is-media-left'
										: 'is-media-right flex-row-reverse'
								} c-buildingbackgroundedintro__smallsection-row`}
								data-aos="fade-up"
							>
								{/* left image */}
								<div
									className={`${colMediaClass} c-buildingbackgroundedintro__smallsection-col-media`}
								>
									{!!image?.url && (
										<BaseImg sources={mediaImgSources} />
									)}
								</div>
								<div
									className={`${colTextClass} pt-5 c-buildingbackgroundedintro__smallsection-col-text`}
								>
									<h2 className="mb-7 normal-case c-buildingbackgroundedintro__smallsection-title">
										{title}
									</h2>
									<Richtext
										className="c-buildingbackgroundedintro__smallsection-list"
										html={content}
									/>
								</div>
							</div>
						)
					})}
			</div>
		</div>
	) : null
}

export default BuildingBackgroundedIntro;
