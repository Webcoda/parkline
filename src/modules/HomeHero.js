import React, { useRef, useEffect } from 'react'
import BaseImg from "@/components/BaseImg";
import './HomeHero.scss'

const HomeHero = ({ item }) => {
	const mediaUrl = item.customFields.backgroundMedia?.url
	const scrollDownRef = useRef(null)
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
			{!!mediaUrl && (
				<div className="u-embed__item">
					<BaseImg sources={mediaImgSources} />
					<div className="u-embed__item u-scrim-hero"></div>
				</div>
			)}
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
					className="inline-flex items-center rounded-full u-horizontal-center w-7.5 h-7.5 bg-yellow hocus:bg-black hocus:text-yellow bottom-0 -mb-4 transition duration-300"
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

