import React from 'react'

import SmallDivider from "@/components/SmallDivider";
import CommonContainer from '@/components/CommonContainer';

const AboutSectionTitle = ({ item }) => {
	const { title } = item.customFields;
	return (
		<CommonContainer className="mb-11">
			<div
				className="text-center text-yellow max-w-xl mx-auto"
				data-aos="fade-up"
			>
				<h2 className="h1">{title}</h2>
				<SmallDivider className="mt-11" />
			</div>
		</CommonContainer>
	)
}

export default AboutSectionTitle;
