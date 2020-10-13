import React from 'react'
import { graphql, StaticQuery } from "gatsby";
import CommonContainer from '@/components/CommonContainer'
import Richtext from '@/components/Richtext'

export default props => (
	<StaticQuery
		query={graphql`
			query MeetTheTeamQuery {
				allAgilityMeetTheTeam {
					nodes {
						properties {
							referenceName
						}
						linkedContent_teamTiles {
							contentID
							customFields {
								cTA {
									href
									target
									text
								}
								text
								title
							}
						}
					}
				}
			}
		`}
		render={queryData => {
			const thisModuleInstance = queryData.allAgilityMeetTheTeam.nodes.filter(
				module =>
					module.properties.referenceName ===
					props.item.properties.referenceName
			)
			return (
				<MeetTheTeam
					tiles={thisModuleInstance[0].linkedContent_teamTiles}
					{...props}
				/>
			)
		}}
	/>
)

const MeetTheTeam = (props) => {
	const { item, tiles } = props;
	const { title, text } = item.customFields
	return (
		<div className="bg-yellow py-23 text-center">
			<CommonContainer>
				{ !!title && (<h2 className="mb-11">{ title }</h2>) }
				{
					!!text && (
						<Richtext className="mb-18" html={text}></Richtext>
					)
				}
				<div className="row no-gutters">
					{
						tiles?.map(tile => {
							return (
								<div className="col">
									{tile.customFields.title}
									{
										<Richtext
											className="mb-18"
											html={tile.customFields.text}
										></Richtext>
									}
									{
										<a
											href={tile.customFields.cTA.href}
											target={
												tile.customFields.cTA.target
											}
										>
											{tile.customFields.cTA.text}
										</a>
									}
								</div>
							)
						})
					}
				</div>

			</CommonContainer>
		</div>
	);
}
