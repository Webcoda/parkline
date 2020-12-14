import React from "react";
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Loadable from '@loadable/component'
import encodeUrl from 'encodeurl';

import BaseImg from "@/components/BaseImg";
import CommonContainer from "@/components/CommonContainer";
import SmallDivider from '@/components/SmallDivider'
import { renderHTML } from '@/agility/utils'

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
	let isSingleVideo = false;
	let poster = '';
	if(!hasMoreThanOneSlide) {
		isSingleVideo = !!media[0].url.match(/\.mp4/);
		if(isSingleVideo && item.contentID === 32) {
			poster = '/about_vid_poster.jpg';
		}
	}

	// purgecss: .bg-yellow, .bg-grey-light
	return (
		<div className="c-contentslider mb-30 last:mb-0" data-aos="fade-up">
			<CommonContainer>
				<div
					className={`bg-${backgroundColor} px-2.5 c-contentslider__top text-center ${
						item.customFields.title ? 'pt-9 md:pt-23' : ''
					}`}
				>
					<div className="row justify-center">
						<div className="relative px-2.5 w-full sm:max-w-4/5 md:max-w-2/5">
							{!!item.customFields.title && (
								<>
									<h2
										dangerouslySetInnerHTML={renderHTML(
											item.customFields.title.replace(/(?:\r\n|\r|\n)/g, '<br>')
										)}
									></h2>
									<SmallDivider className="mt-7.5 mb-9.5 md:my-11" />
								</>
							)}
						</div>
					</div>
				</div>
			</CommonContainer>
			<div className={`c-contentslider__media ${isSingleVideo ? 'c-contentslider__media--singlevideo' : ''}`}>
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
						const mediaItemUrl = encodeUrl(mediaItem.url)

						const mediaImgSources = [
							{
								srcset: [
									{
										src:
											mediaItemUrl + '?q=80&w=2560',
										descriptor: '2560w',
									},
									{
										src:
											mediaItemUrl + '?q=80&w=1920',
										descriptor: '1920w',
									},
									{
										src: mediaItemUrl + '?q=80&w=1024',
										descriptor: '1024w',
									},
									{
										src: mediaItemUrl + '?q=80&w=768',
										descriptor: '768w',
									},
									{
										src: mediaItemUrl + '?q=80&w=480',
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
										url={mediaItemUrl}
										poster={poster}
									/>
								) : (
									<BaseImg
										src={mediaItemUrl + '?q=80&w=2560'}
										lqipSrc={mediaItemUrl + '?q=80&w=8'}
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
