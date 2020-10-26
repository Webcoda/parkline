import React from 'react';
import Richtext from "@/components/Richtext";
import BaseImg from '@/components/BaseImg'
import toBool from '@/utils/convertBoolStrToBool'
import './ContentHero.scss'

const TwoBar = () => (
	<svg className="c-contenthero__twobar" width="39" height="147" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fillRule="evenodd" d="M22.415 146.333H39V.003L22.415.002v146.331z" fill="#FFC300"/>
		<path fillRule="evenodd" clipRule="evenodd" d="M0 146.333h16.585V.001L0 0v146.333z" fill="#FFC300"/>
	</svg>
)

const ContentHero = ({ item }) => {
	const { title, text, isTitleBig, isTitleYellow,  isUseYellowHorizontalBar, twoLinesPosition, media } =  item.customFields;
	const mediaUrl = media?.url;
	const mediaImgSources = [
		{
			srcset: [
				{
					src: mediaUrl + '?w=2560',
					descriptor: '2560w',
				},
				{
					src: mediaUrl + '?w=1920',
					descriptor: '1920w',
				},
				{
					src: mediaUrl + '?w=1024',
					descriptor: '1024w',
				},
				{
					src: mediaUrl + '?w=768',
					descriptor: '768w',
				},
				{
					src: mediaUrl + '?w=480',
					descriptor: '480w',
				},
			],
			type: 'image/png',
		},
	]

	return (
		<div className="relative mb-12">
			<div
				className="relative overflow-hidden bg-black flex flex-col justify-end text-white"
				style={{ height: 652 }}
			>
				{!!mediaUrl && (
					<div className="u-embed__item">
						<BaseImg sources={mediaImgSources} />
						<div className="u-embed__item u-scrim-hero"></div>
					</div>
				)}

				<div className="relative container-fluid flex-auto flex flex-col justify-end pb-20 md:pb-48">
					<div className="row justify-center">
						<div className="md:col-10">
							<div className="row">
								<div className="relative px-2.5 md:w-7/10">
									<h1
										className={`mb-11 ${
											toBool(isTitleBig)
												? 'c-contenthero__title--big'
												: ''
										} ${
											toBool(isTitleYellow)
												? 'text-yellow'
												: ''
										}`}
									>
										{title}
									</h1>
								</div>
							</div>
							{!!text && (
								<div className="row">
									<div className="col md:ml-1/10">
										<div
											className="pl-5"
											style={{ maxWidth: 492 }}
										>
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
				className={`container-fluid c-contenthero__bottom-container ${
					isUseYellowHorizontalBar
						? ''
						: 'is-use-two-bar'
				}`}
			>
				<div className="row">
					{toBool(isUseYellowHorizontalBar) ? (
						<div className="col-8">
							<div className="bg-yellow h-7.5 w-full -ml-2.5"></div>
						</div>
					) : (
						<>
							{twoLinesPosition === 'left' ? (
								<div className="col md:offset-2">
									<div className="pl-5 md:pl-0">
										<TwoBar />
									</div>
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
