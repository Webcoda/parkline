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
			<div className="flex items-center justify-center"
				style={{ height: 170 }}
			>
				<button
					ref={backToTopRef}
					type="button"
					className="b-fsxtiny text-center uppercase"
				>
					<span className="block w-7.5 h-7.5 bg-grey-light mb-2"></span>
					Back to top
				</button>
			</div>
		</>
	)
}
export default OneColumnTemplate;
