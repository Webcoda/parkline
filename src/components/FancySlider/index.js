import React, { useState, useRef, useEffect } from 'react'
import gsap, { Quint } from 'gsap'

export const FancySlide = ({ className, children }) => {
	const el = useRef(null)
	return (
		<div
			ref={el}
			className={`fancyslider__slide w-full h-full top-0 left-0 bg-black z-10 ${className || ''} `}
		>
			<div className="fancyslider__slide-inner w-full h-full">{children}</div>
		</div>
	)
}

export const FancySlider = ({ className, speed, autoplaySpeed = 5000, autoplay=true, children }) => {
	const el = useRef(null)
	const slides = useRef(null)
	let autoplayInterval = useRef(null);
	const [
		{ activeIndex, previousIndex, direction },
		changeActiveIndex,
	] = useState({
		activeIndex: 0,
		previousIndex: 0,
		direction: 1,
	})


	const goTo = (index, stopInterval) => {
		if(stopInterval) {
			clearInterval(autoplayInterval.current)
		}

		const slidesCount = children.length
		const direction = index - activeIndex
		let finalIndex = index
		if (finalIndex >= 0 && finalIndex < slidesCount) {
			changeActiveIndex({
				activeIndex: finalIndex,
				previousIndex: activeIndex,
				direction,
			})
			return
		}
		changeActiveIndex({
			activeIndex:
				(finalIndex % slidesCount) + (finalIndex < 0 ? slidesCount : 0),
			previousIndex: activeIndex,
			direction,
		})
	}

	useEffect(() => {
		var currentSlide = slides.current.querySelector('.fancyslider__slide:first-child')
		var previousSlide = slides.current.querySelector('.fancyslider__slide:nth-child(2)')
		if(previousSlide) {
			previousSlide.classList.add(
				'absolute',
				'z-10',
			)
		}
		currentSlide.classList.remove(
			'absolute',
		)

		if (currentSlide && previousSlide) {
			gsap.fromTo(
				currentSlide,
				{
					x: `${direction > 0 ? '' : '-'}50%`,

					duration: speed,
				},
				{
					x: '0%',
					ease: Quint.easeInOut,
					duration: speed,
				}
			)
			gsap.to(currentSlide.querySelector('.fancyslider__slide-inner'), {
				opacity: 1,
				ease: Quint.easeInOut,
				duration: speed,
			})
			gsap.fromTo(
				previousSlide.querySelector('.fancyslider__slide-inner'),
				{
					opacity: 1,
					ease: Quint.easeInOut,
					duration: speed,
				},
				{
					opacity: 0,
					ease: Quint.easeInOut,
					duration: speed,
				}
			)
			gsap.fromTo(
				previousSlide,
				{
					x: '0%',
					ease: Quint.easeInOut,
					duration: speed,
				},
				{
					x: `${direction > 0 ? '-' : ''}100%`,
					ease: Quint.easeInOut,
					duration: speed,
				}
			)
		}

		if(autoplay) {
			autoplayInterval.current = setInterval(() => goTo(activeIndex + 1), autoplaySpeed)
		}

		return () => clearInterval(autoplayInterval.current)
	})

	const arrayIndexShown =
		activeIndex === previousIndex
			? [activeIndex]
			: [activeIndex, previousIndex]

	return (
		<div ref={el} className={`w-full h-full fancyslider ${className || ''}`}>
			<div className="opacity-0 absolute w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
				{children}
			</div>
			<div className="relative w-full h-full overflow-hidden fancyslider__slides" ref={slides}>
				{arrayIndexShown.map((index, _index) => {
					return children[index]
				})}
			</div>

			{
				children.length > 1 && (
					<div className="flex space-x-2 justify-center fancyslider__dots">
						{children.map((item, index) => (
							<button
								className={`w-2 h-2 bg-white active:bg-black rounded focus:outline-none fancyslider__dot ${index === activeIndex ? 'active' : ''}`}
								key={`dots-${index}`}
								type="button"
								onClick={() => goTo(index, true)}
								aria-label={index+1}
							>
							</button>
						))}
					</div>
				)
			}
		</div>
	)
}
