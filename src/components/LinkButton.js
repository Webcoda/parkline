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
	let _className = `relative overflow-hidden inline-block py-3 px-7 bg-yellow uppercase text-center text-inherit hocus:no-underline transition duration-300 group c-linkbutton ${className}`
	const Component = tag;
	return tag ? (
		<Component {...props} className={_className}>
			{children}
			<div
				className="absolute inset-0 flex flex-col translate-y-full group-hocus:translate-y-0 transition duration-500 overflow-hidden"
				aria-hidden="true"
			>
				{children}
			</div>
		</Component>
	) : (
		<Link to={to} target={target} className={_className}>
			{children}
			<div
				className="absolute inset-0 flex flex-col translate-y-full group-hocus:translate-y-0 transition duration-500 overflow-hidden"
				aria-hidden="true"
			>
				<div
					className={`flex-1 py-3 px-7 -translate-y-full group-hocus:translate-y-0 transition duration-500 bg-black text-yellow`}
				>
					{children}
				</div>
			</div>
		</Link>
	)
}

export default LinkButton;
