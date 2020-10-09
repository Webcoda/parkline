import React from 'react'
import { Link } from 'gatsby'

import './LinkButton.scss'

const LinkButton = ({
	className='',
	children,
	to,
	target,
}) => {
	return (
		<Link
			to={to}
			target={target}
			className={`py-3 px-7 bg-yellow uppercase text-inherit hocus:no-underline hocus:text-yellow hocus:bg-black transition duration-300 c-linkbutton ${className}`}
		>
			{children}
		</Link>
	);
}

export default LinkButton;
