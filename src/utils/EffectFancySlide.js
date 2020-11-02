import { extend, bindModuleMethods } from 'swiper/esm/utils/utils';

// left, width, height, right
// rect(0px, 844px, 900px, 14px)

// const __slide = function(e, t, r) {
// 	var o = this,
// 		s = this.vars.slides[0],
// 		$imageClone = this.params.images[e].clone()
// 	TweenLite.set($imageClone[0], {
// 		x: -this.vars.x * t,
// 	});
// 	TweenLite.set($imageClone.find('img')[0], {
// 		x: (this.vars.x / 2) * t,
// 	});
// 	this.$.slideContainer.append(i);
// 	this.vars.slides.push(i);
// 	var n = new TimelineLite({
// 		onComplete: function() {
// 			r || o._createIntervalSlider(),
// 				o.vars && o.vars.slides[0].remove(),
// 				o.vars && o.vars.slides.shift(),
// 				n.kill(),
// 				(n = null)
// 		},
// 	});
// 	n.to(
// 		s[0],
// 		1.5,
// 		{
// 			opacity: 0,
// 			x: (this.vars.x / 2) * t,
// 			ease: Quint.easeInOut,
// 		},
// 		0
// 	);
// 	n.to(
// 		$imageClone[0],
// 		1.5,
// 		{
// 			x: 0,
// 			ease: Quint.easeInOut,
// 		},
// 		0
// 	);
// 	n.to(
// 		i.find('img')[0],
// 		1.5,
// 		{
// 			x: 0,
// 			ease: Quint.easeInOut,
// 		},
// 		0
// 	);
// }

const Fade = {
	setTranslate() {
		const swiper = this
		const {
			slides,
			activeIndex,
			translate,
			realIndex,
			previousIndex,
		} = swiper
		for (let i = 0; i < slides.length; i += 1) {
			const $slideEl = swiper.slides.eq(i)
			const slideWidth = $slideEl.outerWidth();
			const slideHeight = $slideEl.outerHeight();

			const { swiperSlideOffset: offset, progress } = $slideEl[0]
			let tx = -offset
			if (!swiper.params.virtualTranslate) tx -= swiper.translate
			let ty = 0
			if (!swiper.isHorizontal()) {
				ty = tx
				tx = 0
			}
			const progressMax = 1 - Math.abs(progress);
			const slideOpacity = Math.max(progressMax, 0)
			$slideEl
				.css({
					opacity: slideOpacity,
				})
				.transform(`translate3d(${tx}px, ${ty}px, 0px)`);
			console.log(
				`tx: ${tx},
				translate: ${translate},
				slideOpacity: ${slideOpacity},
				index: ${i},
				realIndex: ${realIndex},
				activeIndex: ${activeIndex},
				previousIndex: ${previousIndex},
			`)
			// $slideEl.find('.c-imagewithlisttext__slide-inner').css({
			// 	transition: `all ${swiper.params.speed}ms ease`,
			// 	clip: `rect(0px, ${slideWidth}px, ${slideHeight}px, ${
			// 		slideOpacity ? 0 : slideWidth
			// 	}px)`,
			// })
		}
	},
	setTransition(duration) {
		const swiper = this
		const { slides, $wrapperEl } = swiper
		slides.transition(duration)
		if (swiper.params.virtualTranslate && duration !== 0) {
			let eventTriggered = false
			slides.transitionEnd(() => {
				if (eventTriggered) return
				if (!swiper || swiper.destroyed) return
				eventTriggered = true
				swiper.animating = false
				const triggerEvents = ['webkitTransitionEnd', 'transitionend']
				for (let i = 0; i < triggerEvents.length; i += 1) {
					$wrapperEl.trigger(triggerEvents[i])
				}
			})
		}
	},
}

export default {
	name: 'effect-fancy',
	params: {
		fadeEffect: {
			crossFade: false,
		},
	},
	create() {
		const swiper = this
		bindModuleMethods(swiper, {
			fadeEffect: {
				...Fade,
			},
		})
	},
	on: {
		beforeInit(swiper) {
			if (swiper.params.effect !== 'fancy') return
			swiper.classNames.push(
				`${swiper.params.containerModifierClass}fancy`
			)
			const overwriteParams = {
				slidesPerView: 1,
				slidesPerColumn: 1,
				slidesPerGroup: 1,
				watchSlidesProgress: true,
				spaceBetween: 0,
				virtualTranslate: true,
			}
			extend(swiper.params, overwriteParams)
			extend(swiper.originalParams, overwriteParams)
		},
		setTranslate(swiper, translate) {
			if (swiper.params.effect !== 'fancy') return
			swiper.fadeEffect.setTranslate(translate)
		},
		setTransition(swiper, duration) {
			if (swiper.params.effect !== 'fancy') return
			swiper.fadeEffect.setTransition(duration)
		},
	},
}
