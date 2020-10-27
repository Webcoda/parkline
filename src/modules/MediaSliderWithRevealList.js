import React, { useRef, useEffect } from 'react';
import { cleanHTML } from "@/agility/utils";
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import BaseImg from '@/components/BaseImg'
import CommonContainer from '@/components/CommonContainer'
import Richtext from '@/components/Richtext'
import SmallDivider from "@/components/SmallDivider";

import './MediaSliderWithRevealList.scss'

// install Swiper components
SwiperCore.use([Navigation, Pagination, A11y])


const RevealList = ({ html, hasBackground }) => {
	const el = useRef(null);

	useEffect(() => {
		const $el = el.current;

		// all the child list
		Array.from($el.querySelectorAll('li > ul')).forEach(ul => {
			ul.classList.add(
				'child',
				'text-text',
				'absolute',
				'opacity-0',
				'w-1/2',
				'top-0',
				'right-0',
				'group-hocus:opacity-100',
				'transition',
				'duration-500',
				'pl-5',
			)
		})
		// all the child list item
		Array.from($el.querySelectorAll('ul.child > li')).forEach((li, index) => {
			li.innerHTML = `<span class="block md:hidden absolute left-0 ${
				hasBackground ? 'bg-white' : 'bg-current'
			} top-5 w-1.5 h-1.5 rounded-full c-mediasliderwithreveallist__child-item-icon"></span>${
				li.innerHTML
			}`
			li.classList.add(
				'relative',
				'child-item',
				'border-b',
				'border-text',
				'py-2.5',
				'first:pt-0',
				'pl-5',
				'md:pl-0',
				'c-mediasliderwithreveallist__child-item'
			)
		})

		// calculate the tallest ul.child
		let tallestUlHeight = 0;
		Array.from($el.querySelectorAll(`ul.child`)).forEach(ul => {
			tallestUlHeight = tallestUlHeight < ul.offsetHeight ? ul.offsetHeight : tallestUlHeight
		})

		// the first parent li
		Array.from($el.querySelectorAll('li:not(.child-item)')).forEach(li => {
			li.classList.add('flex', 'group', 'cursor-pointer',  'py-3', 'first:pt-0', 'last:pb-0');
			li.innerHTML = li.innerHTML.replace(
				li.firstChild.textContent,
				`<div class="flex-1 max-w-1/2 flex space-x-6 text-inherit group-hocus:text-text transition duration-500">
					<div class="w-7.5 h-7.5 flex-shrink-0 inline-flex items-center align-middle bg-grey-light group-hocus:bg-grey-dark text-grey-dark group-hocus:text-yellow transition duration-500">
						<svg class="text-inherit" width="30" height="30" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path stroke="currentColor" d="M15.499 7.105v15.79M7.105 14.5h15.79"/>
						</svg>
					</div>
					<span class="flex-1 align-middle">${li.firstChild.textContent}</span>
				</div>`
			)
		})

		const $rootUl = $el.querySelector('ul');
		$rootUl.classList.add('relative');
		if(hasBackground) {
			$rootUl.classList.add('hocus:text-white');
		}

		// use talleUlHeight to set minHeight for the element to avoid shorter container than the ul
		el.current.style.minHeight = `${tallestUlHeight + 24}px`;

	})

	return (
		<div ref={el} className="reveallist" dangerouslySetInnerHTML={{ __html: cleanHTML(html) }}></div>
	)
}

const MediaSliderWithRevealList = ({ item }) => {
	const { title, intro, revealList, mediaList, backgroundColor } = item.customFields;
	const media = Array.isArray(mediaList)
		? mediaList
		: [mediaList]
	const hasMoreThanOneSlide = media.length > 1

	return (
		<div className="mb-22 md:mb-30 last:mb-0 c-mediasliderwithreveallist">
			<CommonContainer>
				<div className="py-11 relative">
					<div
						className={`absolute inset-0 h-full bg-${backgroundColor} -mx-5 md:mx-0 c-mediasliderwithreveallist__bg`}
					></div>
					<div className="relative">
						<div
							className="mb-23 c-mediasliderwithreveallist__slider"
							data-aos="fade-up"
						>
							<Swiper
								className="h-full"
								pagination={
									hasMoreThanOneSlide
										? { clickable: true }
										: false
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
													src:
														mediaItem.url +
														'?w=2560',
													descriptor: '2560w',
												},
												{
													src:
														mediaItem.url +
														'?w=1920',
													descriptor: '1920w',
												},
												{
													src:
														mediaItem.url +
														'?w=1024',
													descriptor: '1024w',
												},
												{
													src:
														mediaItem.url +
														'?w=768',
													descriptor: '768w',
												},
												{
													src:
														mediaItem.url +
														'?w=480',
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
											<BaseImg
												sources={mediaImgSources}
											></BaseImg>
										</SwiperSlide>
									)
								})}
							</Swiper>
						</div>
						<div className="row">
							<div
								className="relative px-2.5 w-full lg:w-2/5"
								data-aos="fade-up"
							>
								<div className="pr-6">
									<h2 className="mb-7">{title}</h2>
									<Richtext html={intro}></Richtext>
									<SmallDivider className="my-15" />
								</div>
							</div>
							<div
								className="relative px-2.5 w-full lg:w-3/5"
								data-aos="fade-up"
								data-aos-delay="500"
							>
								<RevealList
									html={revealList}
									hasBackground={
										backgroundColor !== 'transparent'
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</CommonContainer>
		</div>
	)
}

export default MediaSliderWithRevealList;
