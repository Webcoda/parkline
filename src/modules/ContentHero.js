import React from 'react';
import Richtext from "@/components/Richtext";
import './ContentHero.scss'

const TwoBar = () => (
	<svg width="39" height="147" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fillRule="evenodd" d="M22.415 146.333H39V.003L22.415.002v146.331z" fill="#FFC300"/>
		<path fillRule="evenodd" clipRule="evenodd" d="M0 146.333h16.585V.001L0 0v146.333z" fill="#FFC300"/>
	</svg>
)

const ContentHero = ({ item }) => {
	const { title, text, isTitleBig, isTitleYellow,  isUseYellowHorizontalBar, twoLinesPosition } =  item.customFields;
	console.log(item.customFields)
	return (
		<div className="relative mb-12">
			<div
				className="bg-black flex flex-col justify-end text-white"
				style={{ height: 652 }}
			>
				<div
					className="container-fluid flex-auto flex flex-col justify-end"
					style={{ paddingBottom: 192 }}
				>
					<div className="row justify-center">
						<div className="md:col-10">
							<div className="row">
								<div className="relative px-2.5 w-7/10">
									<h1
										className={`mb-11 ${
											isTitleBig
												? 'c-contenthero__title--big'
												: ''
										} ${
											isTitleYellow ? 'text-yellow' : ''
										}`}
									>
										{title}
									</h1>
								</div>
							</div>
							{!!text && (
								<div className="row">
									<div className="col md:ml-1/10">
										<div style={{ maxWidth: 492 }}>
											<Richtext
												className="lead"
												html={text}
											></Richtext>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div
				className="container-fluid"
				style={{
					marginTop: isUseYellowHorizontalBar
						? ''
						: `calc(-147px / 2)`,
				}}
			>
				<div className="row">
					{isUseYellowHorizontalBar ? (
						<div className="col-8">
							<div className="bg-yellow h-7.5 w-full -ml-2.5"></div>
						</div>
					) : (
						<>
							{twoLinesPosition === 'left' ? (
								<div className="col md:offset-2">
									<TwoBar />
								</div>
							) : (
								<div className="md:offset-10 col-2 text-center">
									<TwoBar />
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default ContentHero;
