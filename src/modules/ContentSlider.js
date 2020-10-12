import React from "react";
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Loadable from '@loadable/component'

import BaseImg from "@/components/BaseImg";
import CommonContainer from "@/components/CommonContainer";
import SmallDivider from '@/components/SmallDivider'

// Styles
import './ContentSlider.scss'

// install Swiper components
SwiperCore.use([Navigation, Pagination, A11y])

const Plyr = Loadable(() => import('react-plyr'));

/**
 * Note: item.customFields.media is not generated properly in GraphQL because
 * the item.customFields.media (AttachmentList) returns an object when it only has 1 item in the list
 * instead of array, hence, GraphQL doesn't know how to show it cause it's not explicitly defined
 * */

export default ({ item }) => {
	const { backgroundColor='grey-light' } = item.customFields;


	const media = Array.isArray(item.customFields.media) ? item.customFields.media : [item.customFields.media];
	const hasMoreThanOneSlide = media.length > 1;

	// purgecss: .bg-yellow, .bg-grey-light
	return (
		<div className="c-contentslider mb-32.5">
			<CommonContainer>
				<div
					className={`bg-${backgroundColor} c-contentslider__top text-center ${
						item.customFields.title ? 'pt-23' : ''
					}`}
				>
					{!!item.customFields.title && (
						<>
							<h2>{item.customFields.title}</h2>
							<SmallDivider className="my-11" />
						</>
					)}
				</div>
			</CommonContainer>
			<div className="c-contentslider__media">
				<Swiper
					className="h-full"
					pagination={
						hasMoreThanOneSlide ? { clickable: true } : false
					}
					navigation={hasMoreThanOneSlide}
					loop={hasMoreThanOneSlide}
					allowTouchMove={hasMoreThanOneSlide}
				>
					{media.map((mediaItem, index) => {
						const mediaImgSources = [
							{
								srcset: [
									{
										src: mediaItem.url + '?w=2560&h=882',
										descriptor: '2560w',
									},
									{
										src: mediaItem.url + '?w=1920&=882',
										descriptor: '1920w',
									},
									{
										src: mediaItem.url + '?w=1024',
										descriptor: '1024w',
									},
									{
										src: mediaItem.url + '?w=768',
										descriptor: '768w',
									},
									{
										src: mediaItem.url + '?w=480',
										descriptor: '480w',
									},
								],
								type: 'image/png',
							},
						]

						return (
							<SwiperSlide
								key={`content-slide-${item.contentId}-${index}`}
							>
								{!!mediaItem.url.match(/\.mp4/) ? (
									<Plyr
										type="video" // or "vimeo"
										url={mediaItem.url}
									/>
								) : (
									<BaseImg
										sources={mediaImgSources}
									></BaseImg>
								)}
							</SwiperSlide>
						)
					})}
				</Swiper>
			</div>
			<CommonContainer>
				<div className={`bg-${backgroundColor} h-11`}></div>
			</CommonContainer>
		</div>
	)
}
