import React from 'react';
import { renderHTML } from "@/agility/utils";

const Richtext = ({ className = '', html, ...props }) => (
	!!html ?
	(
		<div
			{...props}
			className={`o-richtext ${className}`}
			dangerouslySetInnerHTML={ renderHTML(html) }
		>
		</div>
	) : null
)

export default Richtext;
