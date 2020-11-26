import React from 'react'
import bar from '@/img/bars.svg';
const Preload = () => {
	return (
		<div
			id="___preloader"
			style={{
				position: 'fixed',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				top: 0,
				left: 0,
				background: '#000',
				width: '100%',
				height: '100%',
				zIndex: 50,
			}}
			className="transition duration-500"
		>
			<img width="50" src={bar} alt=""/>
		</div>
	)
}

export default Preload;
