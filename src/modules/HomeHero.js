import React, { useRef } from 'react'
import { graphql, useStaticQuery } from "gatsby";
import SwiperCore, { A11y, Autoplay, EffectFade } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import encodeUrl from 'encodeurl'
import { renderHTML } from '@/agility/utils'

import BaseImg from "@/components/BaseImg";
import './HomeHero.scss'
import toBool from "@/utils/convertBoolStrToBool";
import { sortByItemOrderAsc } from "@/utils/sortByItemOrder";
import mediumForegroundLogoSvg from '@/img/medium-foreground-logo.svg'

// install Swiper components
SwiperCore.use([A11y, Autoplay, EffectFade])

const FADE_ANIMATIONS = {
	topleft: '-translate-x-1/2',
	bottomleft: '-translate-x-1/2',
	topright: 'translate-x-1/2',
	bottomright: 'translate-x-1/2',
}

const HomeHero = ({ item: _item }) => {
	const { allAgilityHomeHero } = useStaticQuery(graphql`
		query allAgilityHomeHeroQuery {
			allAgilityHomeHero {
				nodes {
					customFields {
						autoplaySpeed
					}
					linkedContent_slides {
						customFields {
							heading
							image {
								url
							}
							maskColor
							position
							useBigLogoMask
							useMediumForegroundLogo
						}
						id
						properties {
							itemOrder
						}
					}
					properties {
						referenceName
					}
				}
			}
		}
	`)

	const homeheroRef = useRef(null)
	const item = allAgilityHomeHero.nodes.find(hero => hero.properties.referenceName === _item.properties.referenceName)

	const { linkedContent_slides: slides } = item;

	const handleScrollTo = ()  => {
		window.scrollTo({
			top: homeheroRef.current.nextElementSibling.offsetTop - document.querySelector('header.c-header').offsetHeight - 48,
			behavior: 'smooth',
		})
	}

	return (
		<section ref={homeheroRef} className="c-homehero relative">
			<Swiper
				className="h-full"
				loop={slides.length}
				allowTouchMove={slides.length}
				autoplay={{
					delay: _item.customFields.autoplaySpeed,
				}}
				effect="fade"
				fadeEffect={{ crossFade: true }}
			>
				{slides.sort(sortByItemOrderAsc).map((slide, index) => {
					const {
						heading,
						image,
						maskColor,
						position,
						useBigLogoMask,
						useMediumForegroundLogo,
					} = slide.customFields
					const isUseBigLogoMask = toBool(useBigLogoMask)
					const isUseMediumForegroundLogo = toBool(useMediumForegroundLogo)
					const imageUrl = encodeUrl(image.url);

					const mediaImgSources = [
						{
							srcset: [
								{
									src: imageUrl + '?q=80&w=2560&h=986',
									descriptor: '2560w',
								},
								{
									src: imageUrl + '?q=80&w=1920&h=982',
									descriptor: '1920w',
								},
								{
									src: imageUrl + '?q=80&w=1024',
									descriptor: '1024w',
								},
								{
									src: imageUrl + '?q=80&w=768',
									descriptor: '768w',
								},
								{
									src: imageUrl + '?q=80&w=480',
									descriptor: '480w',
								},
							],
							type: `image/${
								imageUrl.match(/\.([0-9a-z]+)(?:[?#]|$)/i)[1]
							}`,
						},
					]

					let rowClass = 'items-end'
					let colClass = 'sm:col-4 sm:offset-8'

					switch (position) {
						case 'topleft':
							rowClass = 'items-start'
							colClass = 'sm:col-6 sm:offset-1'
							break
						case 'topright':
							rowClass = 'items-start'
							break
						case 'bottomleft':
							colClass = 'sm:col-6 sm:offset-1'
							break
						default:
							break
					}

					// purgecss: c-homehero__slide--1 swiper-slide-active
					return (
						<SwiperSlide className={`group c-homehero__slide--${index}`} key={slide.id}>
							{!!image.url && (
								<div className="u-embed__item">
									<div
										className={`u-embed__item ${
											isUseBigLogoMask
												? 'transition duration-1000 -translate-x-8 group-swiper-slide-active:translate-x-0 group-swiper-slide-duplicate-active:translate-x-0'
												: ''
										}`}
										style={{
											transitionDuration: isUseBigLogoMask
												? `${item.customFields.autoplaySpeed}ms`
												: '',
										}}
									>
										<BaseImg
											src={image.url + '?q=80&w=2560'}
											lqipSrc={image.url + '?q=80&w=8'}
											sources={mediaImgSources}
											imgClassName={`object-cover transition delay-500 group-swiper-slide-active:scale-110 group-swiper-slide-duplicate-active:scale-110`}
											imgAttributes={{
												style: {
													transitionDuration: `${parseInt(
														item.customFields
															.autoplaySpeed
													) + 500}ms`,
												},
											}}
										/>
									</div>
									{isUseBigLogoMask && (
										<div
											className="transition duration-1000 u-embed__item u-bgimg translate-x-4 group-swiper-slide-active:translate-x-0 group-swiper-slide-duplicate-active:translate-x-0"
											style={{
												backgroundImage: `url(/hero-mask.svg)`,
												transitionDuration: `${item.customFields.autoplaySpeed}ms`,
											}}
										></div>
									)}
									<div
										className={`u-embed__item u-scrim-hero `}
									></div>

									{/* purgecss: text-black text-grey-light text-yellow */}
									{!isUseBigLogoMask && (
										<div
											className={`u-embed__item overflow-hidden text-${maskColor}`}
										>
											{position === 'topleft' ||
												(position === 'bottomright' && (
													<>
														{/* top-right icon  */}
														<svg
															width="229"
															height="397"
															viewBox="0 0 229 397"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
															aria-hidden="true"
															className={`h-auto max-w-1/5 absolute top-0 right-0 -translate-y-full transition duration-1000 group-swiper-slide-active:translate-y-0 group-swiper-slide-duplicate-active:translate-y-0`}
														>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M97.4712 397H0V-463L97.4712 -462.993V397ZM229.203 396.999H131.734V-462.99L229.203 -462.982V396.999Z"
																fill="currentColor"
															/>
														</svg>
														{/* bottom-left icon  */}
														<svg
															width="444"
															height="270"
															viewBox="0 0 444 270"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
															focusable="false"
															aria-hidden="true"
															className={`h-auto max-w-1/3 absolute bottom-0 left-0 ${FADE_ANIMATIONS.bottomleft} transition duration-1000 group-swiper-slide-active:translate-x-0 group-swiper-slide-duplicate-active:translate-x-0`}
														>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M125.967 5C298.532 5 438.921 145.416 438.921 318.01C438.921 490.606 298.532 631.023 125.967 631.023H0V533.534H125.967C244.785 533.534 341.45 436.85 341.45 318.01C341.45 199.17 244.785 102.488 125.967 102.488H0V5H125.967ZM0 136.769L128.247 136.783C227.398 137.662 307.948 218.961 307.948 318.011C307.948 417.063 227.398 498.359 128.247 499.242L0 499.255V136.769Z"
																fill="currentColor"
															/>
														</svg>
													</>
												))}
											{position === 'topright' ||
												(position === 'bottomleft' && (
													<>
														{/* topleft icon */}
														<svg
															width="380"
															height="230"
															viewBox="0 0 380 230"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
															focusable="false"
															aria-hidden="true"
															className={`h-auto max-w-1/3 absolute top-0 left-0 -translate-y-full transition duration-1000 group-swiper-slide-active:translate-y-0 group-swiper-slide-duplicate-active:translate-y-0`}
														>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M36.7623 -527C244.665 -527 413.803 -357.829 413.803 -149.892C413.803 58.048 244.665 227.219 36.7623 227.219H-115V109.767H36.7623C179.912 109.767 296.372 -6.71606 296.372 -149.892C296.372 -293.068 179.912 -409.548 36.7623 -409.548H-115V-527H36.7623ZM-115 -368.248L39.5089 -368.231C158.965 -367.172 256.01 -269.225 256.01 -149.891C256.01 -30.5554 158.965 67.3887 39.5089 68.4521L-115 68.468V-368.248Z"
																fill="currentColor"
															/>
														</svg>
														{/* bottomright icon  */}
														<svg
															width="276"
															height="338"
															viewBox="0 0 276 338"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
															focusable="false"
															aria-hidden="true"
															className={`h-auto max-w-1/5 absolute bottom-0 right-0 translate-y-full transition duration-1000 group-swiper-slide-active:translate-y-0 group-swiper-slide-duplicate-active:translate-y-0`}
														>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M117.431 1036.11H0V0L117.431 0.00863425V1036.11ZM276.139 1036.11H158.711V0.0117188L276.139 0.021792V1036.11Z"
																fill="currentColor"
															/>
														</svg>
													</>
												))}
										</div>
									)}
								</div>
							)}
							<div className="relative h-full text-white c-homehero__fg">
								<div className="container-fluid h-full c-homehero__fg-inner">
									<div className={`row h-full ${rowClass}`}>
										<div className={`${colClass}`}>
											<h1
												className={`c-homehero__title ${
													FADE_ANIMATIONS[position]
												} opacity-0 transition ${
													isUseBigLogoMask
														? ''
														: 'delay-500'
												} duration-1000 group-swiper-slide-active:translate-x-0 group-swiper-slide-duplicate-active:translate-x-0 group-swiper-slide-active:opacity-100 group-swiper-slide-duplicate-active:opacity-100`}
												dangerouslySetInnerHTML={renderHTML(
													heading
												)}
											></h1>
										</div>
										{isUseMediumForegroundLogo && (
											<div className="sm:col-5 sm:text-right hidden sm:block">
												<img
													className={`sm:-mt-19 sm:-mr-5 md:-mr-2.5 translate-x-full opacity-0 transition duration-1000 group-swiper-slide-active:translate-x-0 group-swiper-slide-duplicate-active:translate-x-0 group-swiper-slide-active:opacity-100 group-swiper-slide-duplicate-active:opacity-100`}
													src={
														mediumForegroundLogoSvg
													}
													alt=""
												/>
											</div>
										)}
									</div>
								</div>
							</div>
						</SwiperSlide>
					)
				})}
			</Swiper>

			<button
				className="relative z-1 inline-flex items-center rounded-full u-horizontal-center w-7.5 h-7.5 bg-yellow hocus:bg-black hocus:text-yellow bottom-0 -mb-4 transition duration-300"
				aria-label="Scroll to content"
				onClick={handleScrollTo}
			>
				<svg
					width="30"
					height="30"
					viewBox="0 0 30 30"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8.25085 12.75L15.1265 19L22.0009 12.75"
						stroke="currentColor"
						strokeWidth="1.198"
						strokeLinecap="round"
					/>
				</svg>
			</button>
		</section>
	)
}
export default HomeHero

