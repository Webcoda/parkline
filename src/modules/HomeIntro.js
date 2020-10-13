import React from 'react'
import CommonContainer from "@/components/CommonContainer";
import LinkButton from '@/components/LinkButton';
import SmallDivider from '@/components/SmallDivider'
import Richtext from '@/components/Richtext'
import './HomeIntro.scss'

const HomeIntro = ({ item }) => {
	const { title, text, cTA } = item.customFields;
	return (
		<section className="c-homeintro my-30 last:mb-0">
			<CommonContainer>
				<div className="w-7/10">
					<h2 className="h1 text-yellow mb-11">
						{title}
					</h2>
					<div className="ml-1/10">
						<Richtext html={text} />
						<SmallDivider className="my-11 block" />

						<LinkButton
							to={cTA.href}
							target={cTA.target}
						>
							{cTA.text}
						</LinkButton>
					</div>
				</div>
			</CommonContainer>
		</section>
	)
}
export default HomeIntro

