import React from 'react';
import { renderHTML } from "@/agility/utils";

const Richtext = ({ className = '', html }) => (
	!!html ?
	(
		<div
			className={`o-richtext ${className}`}
			dangerouslySetInnerHTML={ renderHTML(html) }
		>
		</div>
	) : null
)

export default Richtext;
