import React from 'react';

const SmallDivider = ({
	className='',
	strokeColor='#231F20',
	...props
}) => {
	return (
		<svg
			{...props}
			aria-hidden="true"
			focusable="false"
			className={className}
			width="30"
			height="2"
			viewBox="0 0 30 2"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M0 1.39355H30" stroke={strokeColor} />
		</svg>
	)
}

export default SmallDivider;
