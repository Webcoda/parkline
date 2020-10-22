import React from 'react'
import Link from '@/components/Link'

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
			className={`inline-flex py-3 px-7 bg-yellow uppercase text-inherit hocus:no-underline hocus:text-yellow hocus:bg-black transition duration-300 c-linkbutton ${className}`}
		>
			{children}
		</Link>
	);
}

export default LinkButton;
