import React from 'react';
import { renderHTML } from "@/agility/utils";

const Richtext = ({ className = '', html }) => (
	<div
		className={`o-richtext ${className}`}
		dangerouslySetInnerHTML={ renderHTML(html) }
	>
	</div>
)

export default Richtext;
