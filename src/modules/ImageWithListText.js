import React from 'react';
import SwiperCore, { Pagination, A11y } from 'swiper'
import Loadable from '@loadable/component'
import { Swiper, SwiperSlide } from 'swiper/react'
import Richtext from '@/components/Richtext'
import SmallDivider from '@/components/SmallDivider'
import BaseImg from '@/components/BaseImg'
import LinkButton from "@/components/LinkButton";

import toBool from '@/utils/convertBoolStrToBool'

// Styles
import './ImageWithListText.scss'

const Plyr = Loadable(() => import('react-plyr'))

// install Swiper components
SwiperCore.use([Pagination, A11y])

/**
 * Image logic:
 * 1. if it's on the right, it will always be to the right edge
 * 2. if it's on the left
 *    a. if it's a slider / isUseBorderOnImage, it will on the left edge
 *    b. otherwise it will be offset-1
 */

const ImageWithListText = ({ item }) => {
	const { title, intro, listContent, mediaPosition, isUseBorderOnImage, isUseImageVerticalOffset, cTA } = item.customFields;

	const mediaList = Array.isArray(item.customFields.mediaList) ? item.customFields.mediaList : [item.customFields.mediaList];
	const hasMoreThanOneMedia = mediaList.length > 1;
	const isMediaPositionLeft = mediaPosition === 'left'

	// purgecss: c-imagewithlisttext--left c-imagewithlisttext--right
	return (
		<div
			className={`flex flex-col c-imagewithlisttext c-imagewithlisttext--${mediaPosition} ${
				hasMoreThanOneMedia ? 'c-imagewithlisttext--multiple' : ''
			} ${
				toBool(isUseBorderOnImage)
					? 'c-imagewithlisttext--withborder'
					: ''
			} ${
				toBool(isUseImageVerticalOffset)
					? 'pt-22 bg-grey-light c-imagewithlisttext--withverticaloffset'
					: ''
			} mb-30 last:mb-0`}
		>
			<div className="container-fluid flex-1 flex flex-col c-imagewithlisttext__inner">
				<div
					className={`flex-1 row ${
						mediaPosition === 'left' ? 'md:flex-row-reverse' : ''
					}`}
				>
					<div
						className={`flex flex-col c-imagewithlisttext__col-text ${
							isMediaPositionLeft
								? 'md:offset-1 md:col-4 md:mr-1/12'
								: 'md:offset-1 md:col-4 md:mr-1/12'
						} `}
					>
						<div
							className={`${
								toBool(isUseImageVerticalOffset)
									? 'md:pb-23'
									: ''
							}`}
						>
							<h2 className="mb-7" data-aos="fade-up">
								{title}
							</h2>
							{!!intro && (
								<Richtext html={intro} data-aos="fade-up" />
							)}
							<SmallDivider
								className="mt-10 mb-11"
								data-aos="fade-up"
							/>
							{!!listContent && (
								<Richtext
									html={listContent}
									data-aos="fade-up"
								/>
							)}
							{!!cTA && (
								<div data-aos="fade-up">
									<LinkButton
										to={cTA.href}
										target={cTA.target}
									>
										{cTA.text}
									</LinkButton>
								</div>
							)}
						</div>
					</div>
					<div
						className={`flex flex-col mt-12.5 md:mt-0 c-imagewithlisttext__col-media ${
							isMediaPositionLeft
								? `${
										hasMoreThanOneMedia ||
										toBool(isUseBorderOnImage)
											? 'col-9 md:col-6'
											: 'col-9 md:col-5'
								  }`
								: `${
										hasMoreThanOneMedia ||
										toBool(isUseBorderOnImage)
											? 'md:col-6'
											: 'md:offset-1 md:col-5'
								  }`
						}`}
						data-aos="fade-up"
					>
						<div
							className={`flex-1 flex c-imagewithlisttext__col-media-inner ${
								toBool(isUseBorderOnImage) &&
								!hasMoreThanOneMedia &&
								isMediaPositionLeft
									? 'flex-row-reverse'
									: ''
							} ${
								isMediaPositionLeft ? '-ml-2.5 md:ml-0' : ''
							}`}
						>
							<div className="flex-auto relative">
								<div className="u-embed__item">
									<Swiper
										className="h-full"
										pagination={
											hasMoreThanOneMedia
												? { clickable: true }
												: false
										}
										loop={hasMoreThanOneMedia}
										allowTouchMove={hasMoreThanOneMedia}
									>
										{mediaList
											.filter(
												mediaItem => !!mediaItem?.url
											)
											.map((mediaItem, index) => {
												const mediaImgSources = [
													{
														srcset: [
															{
																src:
																	mediaItem.url +
																	'?w=2560',
																descriptor:
																	'2560w',
															},
															{
																src:
																	mediaItem.url +
																	'?w=1920',
																descriptor:
																	'1920w',
															},
															{
																src:
																	mediaItem.url +
																	'?w=1024',
																descriptor:
																	'1024w',
															},
															{
																src:
																	mediaItem.url +
																	'?w=768',
																descriptor:
																	'768w',
															},
															{
																src:
																	mediaItem.url +
																	'?w=480',
																descriptor:
																	'480w',
															},
														],
														type: 'image/png',
													},
												]

												return (
													<SwiperSlide
														key={`imagewithlisttext-${item.contentId}-${index}`}
													>
														{!!mediaItem.url.match(
															/\.mp4/
														) ? (
															<Plyr
																type="video" // or "vimeo"
																url={
																	mediaItem.url
																}
															/>
														) : (
															<BaseImg
																sources={
																	mediaImgSources
																}
															></BaseImg>
														)}
													</SwiperSlide>
												)
											})}
									</Swiper>
								</div>
							</div>
							{// single-media image border
							toBool(isUseBorderOnImage) &&
								!hasMoreThanOneMedia && (
									<div
										className={`bg-yellow ${
											isMediaPositionLeft
												? 'w-1/6'
												: 'w-22'
										}`}
									></div>
								)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ImageWithListText;