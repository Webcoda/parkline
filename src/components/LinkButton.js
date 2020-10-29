import React from 'react'
import Link from '@/components/Link'

import './LinkButton.scss'

const LinkButton = ({
	className='',
	children,
	to,
	target,
	tag,
	...props
}) => {
	let _className = `inline-block py-3 px-7 bg-yellow uppercase text-center text-inherit hocus:no-underline hocus:text-yellow hocus:bg-black transition duration-300 c-linkbutton ${className}`
	const Component = tag;
	return tag ? (
		<Component
			{...props}
			className={_className}
		>
			{ children }
		</Component>
	)
	: (
		<Link
			to={to}
			target={target}
			className={_className}
		>
			{children}
		</Link>
	);
}

export default LinkButton;
