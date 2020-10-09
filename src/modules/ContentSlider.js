import React from "react";
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import BaseImg from "@/components/BaseImg";
import CommonContainer from "@/components/CommonContainer";
import SmallDivider from '@/components/SmallDivider'

// Styles
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import './ContentSlider.scss'

// install Swiper components
SwiperCore.use([Navigation, Pagination, A11y])

export default ({ item }) => {
	const media = Array.isArray(item.customFields.media) ? item.customFields.media : [item.customFields.media];

	return (
		<div className="c-contentslider">
			<CommonContainer>
				<div
					className={`bg-yellow c-contentslider__top text-center ${
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
					pagination={{ clickable: true }}
					navigation
					loop
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
							<SwiperSlide key={`content-slide-${item.contentId}-${index}`}>
								<BaseImg sources={mediaImgSources}></BaseImg>
							</SwiperSlide>
						)
					})}
				</Swiper>
			</div>
			<CommonContainer>
				<div className="bg-yellow h-11"></div>
			</CommonContainer>
		</div>
	)
}
