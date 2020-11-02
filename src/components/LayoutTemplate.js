import React from "react"

export default ({ className, children }) => {
	return (
		<div className={className}>
			{children}
		</div>
	)
}

