import React from 'react'

import SmallDivider from "@/components/SmallDivider";

const AboutSectionTitle = ({ item }) => {
	const { title } = item.customFields;
	return (
		<div className="text-center text-yellow max-w-xl mx-auto mb-11">
			<h2 className="h1">{title}</h2>
			<SmallDivider />
		</div>
	);
}

export default AboutSectionTitle;
