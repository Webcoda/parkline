import React from 'react';
import ContentZone from '../agility/components/ContentZone'
import CommonContainer from '@/components/CommonContainer'

const EnquiryPageTemplate = (props) => {
	const bgStyle = {
		backgroundImage: `url("/contact-form-bg-left.svg"), url("/contact-form-bg-right.svg")`,
		backgroundPosition: `left top, right bottom`,
	}

    return (
		<>
			<div
				className="bg-grey-light bg-no-repeat pt-30 pb-20"
				style={bgStyle}
			>
				<CommonContainer className="overflow-hidden">
					<div className="row -mt-12">
						<div className="md:col-5 mt-12">
							<ContentZone name="TopLeftColumn" {...props} />
						</div>
						<div className="md:offset-1 md:col-3 mt-12">
							<ContentZone name="TopRightColumn" {...props} />
						</div>
					</div>
				</CommonContainer>
			</div>
			<ContentZone name="Bottom" {...props} />
		</>
	)
}
export default EnquiryPageTemplate;
