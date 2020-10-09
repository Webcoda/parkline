import React from 'react'
import CommonContainer from "@/components/CommonContainer";
import LinkButton from '@/components/LinkButton';
import SmallDivider from '@/components/SmallDivider'
import Richtext from '@/components/Richtext'
import './HomeIntro.scss'

const HomeIntro = ({ item }) => {
	return (
		<section className="my-30 c-homeintro">
			<CommonContainer>
				<div className="w-7/10">
					<h2 className="h1 text-yellow mb-11">
						{item.customFields.title}
					</h2>
					<div className="ml-1/10">
						<Richtext
							html={item.customFields.text}
						/>
						<SmallDivider
							className="my-11 block"
						/>

						<LinkButton
							to={item.customFields.cTA.href}
							target={item.customFields.cTA.target}
						>
							{item.customFields.cTA.text}
						</LinkButton>
					</div>
				</div>

			</CommonContainer>
		</section>
	)
}
export default HomeIntro

