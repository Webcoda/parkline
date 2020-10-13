import React, { useRef, useEffect } from 'react';
import vivus from 'vivus'

const Vivus = (props) => {
	const { id, className='', children, html } = props
	const el = useRef(null)

	useEffect(() => {
		const svg = el.current.querySelector('svg')
		if(!svg) return;
		new vivus(svg, props.option, props.callback);
	})

	return (
		<div className={className} id={id} ref={el} dangerouslySetInnerHTML={{ __html: html }}>
			{children}
		</div>
	);
}

export default Vivus;
