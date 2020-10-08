import React, { useRef, useEffect } from 'react'
import BaseImg from "@/components/BaseImg";
import './HomeHero.scss'

const HomeHero = ({ item }) => {
	let jumboTronStyle = {};
	if (item.customFields.backgroundMedia) {
		jumboTronStyle.backgroundImage =
			"url('" + item.customFields.backgroundMedia.url + "?w=1000')"
	}

	const scrollDownRef = useRef(null)

	const mediaImgSources = [
		{
			srcset: [
				{
					src: item.customFields.backgroundMedia.url + '?w=2560',
					descriptor: '2560w',
				},
				{
					src: item.customFields.backgroundMedia.url + '?w=1920',
					descriptor: '1920w',
				},
				{
					src: item.customFields.backgroundMedia.url + '?w=1024',
					descriptor: '1024w',
				},
				{
					src: item.customFields.backgroundMedia.url + '?w=768',
					descriptor: '768w',
				},
				{
					src: item.customFields.backgroundMedia.url + '?w=480',
					descriptor: '480w',
				},
			],
			type: 'image/png',
		},
	]

	useEffect(() => {
		scrollDownRef.current.addEventListener('click', () => {
			window.scrollTo({
				y: 200,
				behavior: 'smooth',
			});
		})
	}, [])

	return (
		<section className="c-homehero u-bgimg relative">
			<div className="u-embed__item">
				<BaseImg sources={mediaImgSources} />
			</div>
			<div className="relative h-full text-white c-homehero__fg">
				<div className="container-fluid h-full c-homehero__fg-inner">
					<div className="row h-full items-end">
						<div className="md:col-6 md:offset-6">
							<h1 className="c-homehero__title">
								{item.customFields.title}
							</h1>
						</div>
					</div>
				</div>
				<button
					ref={scrollDownRef}
					className="inline-flex items-center rounded-full u-horizontal-center w-7.5 h-7.5 bg-yellow bottom-0 -mb-4"
					aria-label="Scroll to content"
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
			</div>
		</section>
	)
}
export default HomeHero

