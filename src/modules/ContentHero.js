import React from 'react';
import encodeUrl from 'encodeurl';
import Richtext from "@/components/Richtext";
import BaseImg from '@/components/BaseImg'
import toBool from '@/utils/convertBoolStrToBool'
import './ContentHero.scss'

const TwoBar = () => (
	<>
		<svg
			className="hidden sm:inline-block c-contenthero__twobar"
			width="39"
			height="147"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMidYMid meet"
		>
			<path
				fillRule="evenodd"
				d="M22.415 146.333H39V.003L22.415.002v146.331z"
				fill="#FFC300"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M0 146.333h16.585V.001L0 0v146.333z"
				fill="#FFC300"
			/>
		</svg>
		<svg
			className="sm:hidden c-contenthero__twobar"
			width="30"
			height="110"
			viewBox="0 0 30 110"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M17.2424 109.75H30V0.00228772L17.2424 0.0012207V109.75Z"
				fill="#FFC300"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M0 109.75H12.7579V0.000914586L0 0V109.75Z"
				fill="#FFC300"
			/>
		</svg>
	</>
)

const ContentHero = ({ item }) => {
	const { title, text, isTitleBig, isTitleYellow,  isUseYellowHorizontalBar, twoLinesPosition, media } =  item.customFields;
	const mediaUrl = encodeUrl(media?.url);
	const mediaImgSources = [
		{
			srcset: [
				{
					src: mediaUrl + '?q=80&w=2560',
					descriptor: '2560w',
				},
				{
					src: mediaUrl + '?q=80&w=1920',
					descriptor: '1920w',
				},
				{
					src: mediaUrl + '?q=80&w=1024',
					descriptor: '1024w',
				},
				{
					src: mediaUrl + '?q=80&w=768',
					descriptor: '768w',
				},
				{
					src: mediaUrl + '?q=80&w=480',
					descriptor: '480w',
				},
			],
		},
	]

	return (
		<div className="relative mb-12.5 c-contenthero">
			<div className="relative overflow-hidden bg-black flex flex-col justify-end text-white c-contenthero__inner">
				{!!mediaUrl && (
					<div className="u-embed__item">
						<BaseImg
							src={mediaUrl + '?q=80&w=2560'}
							lqipSrc={mediaUrl + '?q=80&w=8'}
							sources={mediaImgSources}
						/>
						<div className="u-embed__item u-scrim-hero"></div>
					</div>
				)}
				<div className="u-embed__item flex-auto flex flex-col">
					<div className="relative container-fluid flex-auto flex flex-col justify-end pb-20 c-contenthero__textcontainer">
						<div className="row justify-center c-contenthero__row">
							<div className="md:col-10 c-contenthero__row-inner">
								<div className="row">
									<div className="relative px-2.5 md:max-w-7/10">
										<h1
											className={`h2 sm:h1 c-contenthero__title ${
												toBool(isTitleBig)
													? 'c-contenthero__title--big'
													: ''
											} ${
												toBool(isTitleYellow)
													? 'text-yellow'
													: ''
											}`}
											data-aos="fade-up"
										>
											{title}
										</h1>
									</div>
								</div>
								{!!text && (
									<div className="row mt-11">
										<div
											className="relative px-2.5 flex-grow md:max-w-2/5 md:ml-1/10"
											data-aos="fade-up"
											data-aos-delay="500"
										>
											<Richtext
												className="lead pl-10 md:pl-0"
												html={text}
											/>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className={`container-fluid c-contenthero__bottom-container ${
					toBool(isUseYellowHorizontalBar) ? '' : 'is-use-two-bar'
				}`}
			>
				<div
					className={`row ${
						!toBool(isUseYellowHorizontalBar) &&
						twoLinesPosition === 'right'
							? 'justify-end'
							: ''
					}`}
				>
					{toBool(isUseYellowHorizontalBar) ? (
						<div className="col-8">
							<div className="bg-yellow h-7.5 w-full -ml-2.5"></div>
						</div>
					) : (
						<>
							{twoLinesPosition === 'left' ? (
								<div className="col md:offset-2">
									<div className="pl-10 md:pl-0">
										<TwoBar />
									</div>
								</div>
							) : (
								<div className="relative px-2.5 text-center md:mr-1/12">
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
