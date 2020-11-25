import React, { useState, useEffect } from 'react'

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
			<svg
				width="50"
				height="51.85"
				viewBox="0 0 135 140"
				xmlns="http://www.w3.org/2000/svg"
				fill="#FFC300"
			>
				<rect y="10" width="15" height="120" rx="6">
					<animate
						attributeName="height"
						begin="0.5s"
						dur="1s"
						values="120;110;100;90;80;70;60;50;40;140;120"
						calcMode="linear"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="y"
						begin="0.5s"
						dur="1s"
						values="10;15;20;25;30;35;40;45;50;0;10"
						calcMode="linear"
						repeatCount="indefinite"
					/>
				</rect>
				<rect x="30" y="10" width="15" height="120" rx="6">
					<animate
						attributeName="height"
						begin="0.25s"
						dur="1s"
						values="120;110;100;90;80;70;60;50;40;140;120"
						calcMode="linear"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="y"
						begin="0.25s"
						dur="1s"
						values="10;15;20;25;30;35;40;45;50;0;10"
						calcMode="linear"
						repeatCount="indefinite"
					/>
				</rect>
				<rect x="60" width="15" height="140" rx="6">
					<animate
						attributeName="height"
						begin="0s"
						dur="1s"
						values="120;110;100;90;80;70;60;50;40;140;120"
						calcMode="linear"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="y"
						begin="0s"
						dur="1s"
						values="10;15;20;25;30;35;40;45;50;0;10"
						calcMode="linear"
						repeatCount="indefinite"
					/>
				</rect>
				<rect x="90" y="10" width="15" height="120" rx="6">
					<animate
						attributeName="height"
						begin="0.25s"
						dur="1s"
						values="120;110;100;90;80;70;60;50;40;140;120"
						calcMode="linear"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="y"
						begin="0.25s"
						dur="1s"
						values="10;15;20;25;30;35;40;45;50;0;10"
						calcMode="linear"
						repeatCount="indefinite"
					/>
				</rect>
				<rect x="120" y="10" width="15" height="120" rx="6">
					<animate
						attributeName="height"
						begin="0.5s"
						dur="1s"
						values="120;110;100;90;80;70;60;50;40;140;120"
						calcMode="linear"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="y"
						begin="0.5s"
						dur="1s"
						values="10;15;20;25;30;35;40;45;50;0;10"
						calcMode="linear"
						repeatCount="indefinite"
					/>
				</rect>
			</svg>
		</div>
	)
}

export default Preload;
