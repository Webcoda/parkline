import React from "react";

export default ({ className='', children }) => (
	<div className={`container-fluid ${className}`}>
		<div className="row justify-center w-full">
			<div className="col-10">
				{ children }
			</div>
		</div>
	</div>
)
