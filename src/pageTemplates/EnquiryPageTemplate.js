import React from 'react';
import ContentZone from '../agility/components/ContentZone'

const EnquiryPageTemplate = (props) => {
    return (
		<>
			<div className="row">
				<div className="col">
					<ContentZone name="TopLeftColumn" {...props} />
				</div>
				<div className="col">
					<ContentZone name="TopRightColumn" {...props} />
				</div>
			</div>
			<ContentZone name="Bottom" {...props} />
		</>
	)
}
export default EnquiryPageTemplate;
