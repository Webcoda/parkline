import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import CommonContainer from '@/components/CommonContainer'
import Richtext from '@/components/Richtext'

import './ContactOurTeam.scss'

export default props => (
	<StaticQuery
		query={graphql`
			query ContactOurTeamQuery {
				allAgilityContactOurTeam {
					nodes {
						id
						linkedContent_teamDetails {
							id
							customFields {
								details
								name
							}
						}
						properties {
							referenceName
						}
					}
				}
			}
		`}
		render={queryData => {
			const thisModuleInstance = queryData.allAgilityContactOurTeam.nodes.filter(
				module =>
					module.properties.referenceName ===
					props.item.properties.referenceName
			)
			return (
				<ContactOurTeam
					teamDetails={
						thisModuleInstance[0].linkedContent_teamDetails
					}
					{...props}
				/>
			)
		}}
	/>
)

const ContactOurTeam = ({ item, teamDetails }) => {
	const { title } = item.customFields
	return (
		<CommonContainer className="pt-20 pb-30">
			{!!title && (
				<h1 className="h2 mb-11" data-aos="fade-up">
					{title}
				</h1>
			)}
			{!!teamDetails && !!teamDetails.length && (
				<div className="overflow-hidden">
					<div className="row -mt-12">
						{teamDetails.map((teamDetail, index) => {
							const { name, details } = teamDetail.customFields
							return (
								<div
									key={teamDetail.id}
									className="col-12 md:col-3 mt-12 font-normal"
									data-aos="fade-up"
									data-aos-delay={200 * index}
								>
									{!!name && (
										<h2 className="mb-3 normal-case c-contactourteam__teamdetails-name">
											{name}
										</h2>
									)}
									{!!details && <Richtext html={details} />}
								</div>
							)
						})}
					</div>
				</div>
			)}
		</CommonContainer>
	)
}
