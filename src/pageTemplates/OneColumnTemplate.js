import React, { useEffect, useRef } from 'react';
import ContentZone from '../agility/components/ContentZone'

const OneColumnTemplate = (props) => {
	const backToTopRef = useRef(null)

	useEffect(() => {
		backToTopRef.current.addEventListener('click', () => {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		})
	}, [])

    return (
		<>
			<div className="one-column-template">
				<ContentZone name="MainContentZone" {...props} />
			</div>
			<div
				className="flex items-center justify-center"
				style={{ height: 170 }}
			>
				<button
					ref={backToTopRef}
					type="button"
					className="b-fsxtiny text-center uppercase"
				>
					<svg
						aria-hidden="true"
						focusable="false"
						width="30"
						height="30"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path fill="#F0F0F0" d="M30 0v30H0V0z" />
						<path
							d="M26 14.908L15.023 5 4.046 14.908M15.023 5.025v20.151"
							stroke="#231F20"
							strokeWidth=".75"
							strokeLinecap="round"
						/>
					</svg>
					<span className="block w-7.5 h-7.5 bg-grey-light mb-2"></span>
					Back to top
				</button>
			</div>
		</>
	)
}
export default OneColumnTemplate;
