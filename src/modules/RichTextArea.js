import React from 'react';
import { renderHTML } from '../agility/utils'

const RichTextArea = ({ item }) => {

    return (
		<section className="container" data-aos="fade-up">
			<div
				className="o-richtext"
				dangerouslySetInnerHTML={renderHTML(item.customFields.textblob)}
			></div>
		</section>
	)
}

export default RichTextArea;
