const plugin = require('tailwindcss/plugin')

const toRem = (x, base=4) =>`${x/base}rem`


const customSpacing = (spacingArray) => {
	const spacing = {};
	spacingArray.forEach(space => {
		spacing[`${space}`] = toRem(space);
	})
	return spacing;
}

module.exports = {
	target: [
		'browserslist',
		{
			objectFit: 'relaxed',
			objectPosition: 'relaxed',
			position: 'relaxed',
		},
	],
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: {
		mode: 'all',
		content: ['./src/**/*.js'],
		options: {
			rejected: true,
			whitelistPatterns: [/swiper-/, /aos/],
		},
	},
	theme: {
		screens: {
			sm: '768px',
			md: '1024px',
			lg: '1312px',
		},
		extend: {
			spacing: {
				...customSpacing([
					1.25,
					2.25,
					3.75,
					4.5,
					5.5,
					6.25,
					6.5,
					6.75,
					7.5,
					8.75,
					9.5,
					11.25,
					12,
					12.5,
					13.5,
					15,
					15.5,
					16,
					18,
					18.75,
					19,
					20,
					22,
					23,
					24.5,
					25,
					26,
					30,
					32.5,
					44,
					45,
					46,
					48,
					50,
					115,
					300,
				]),
				'1/10': '10%',
				'3/10': '30%',
				'7/10': '70%',
				full: '100%',
			},
			backgroundColor: {
				current: 'currentColor',
			},
			borderColor: theme => ({
				...theme('colors'),
				default: '#d8d8d8',
			}),
			borderWidth: {
				5: '5px',
			},
			colors: {
				inherit: 'inherit',
				yellow: '#FFC300',
				text: '#231F20',
				grey: {
					light: '#f0f0f0',
					'light-medium': '#404040',
					medium: '#999999',
					dark: '#333333',
				},
			},
			fontFamily: {
				sans: [
					'Aeonik',
					'"Helvetica Neue"',
					'Arial',
					'"Noto Sans"',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
				heading: [
					'Ranua',
					'"Helvetica Neue"',
					'Arial',
					'"Noto Sans"',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
			},
			inset: theme => ({
				...theme('spacing'),
			}),
			minHeight: theme => ({
				...theme('spacing'),
			}),
			maxWidth: theme => ({
				...theme('spacing'),
			}),
			zIndex: {
				1: 1,
			},
		},
	},
	variants: {
		backgroundColor: [
			'responsive',
			'hover',
			'focus',
			'hocus',
			'group-hocus',
			'is-active',
			'disabled',
			'sibling-checked',
		],
		borderWidth: ['first', 'last'],
		display: ['responsive', 'collapsed', 'is-active'],
		fill: ['responsive', 'group-hocus'],
		opacity: [
			'responsive',
			'hover',
			'focus',
			'collapsed',
			'is-active',
			'hocus',
			'group-hocus',
			'disabled',
			'group-swiper-slide-active',
			'group-swiper-slide-duplicate-active',
		],
		padding: ['responsive', 'first', 'last'],
		scale: [
			'responsive',
			'hover',
			'focus',
			'group-swiper-slide-active',
			'group-swiper-slide-duplicate-active',
		],
		textColor: [
			'hover',
			'focus',
			'is-active',
			'hocus',
			'group-hocus',
			'collapsed',
		],
		textDecoration: ['responsive', 'hover', 'focus', 'hocus'],
		translate: [
			'responsive',
			'hover',
			'focus',
			'is-active',
			'group-active',
			'group-hover',
			'group-hocus',
			'group-swiper-slide-active',
			'group-swiper-slide-duplicate-active',
		],
		margin: ['responsive', 'first', 'last'],
	},
	plugins: [
		require('@tailwindcss/ui'),
		require('tailwind-bootstrap-grid')({
			gridGutterWidth: '20px', // >= sm
			containerMaxWidths: {
				sm: '768px',
				md: '1024px',
				lg: '1312px',
			},
		}),
		require('tailwindcss-interaction-variants'),
		plugin(({ addVariant, addUtilities, e }) => {
			const newUtilities = {
				'.h-screen': {
					height: 'var(--viewport-height)',
				},
			}
			addUtilities(newUtilities, ['responsive'])

			const variants = [
				{ variantName: 'collapsed' },
				{ variantName: 'is-open' },
				{ variantName: 'slick-disabled' },
				{ variantName: 'collapsed' },
				{ variantName: 'active' },
				{ variantName: 'is-active', selectorName: 'active' },
				{ variantName: 'group-collapsed', isGroup: true },
				{ variantName: 'group-active', isGroup: true },
				{ variantName: 'group-is-open', isGroup: true },
				{ variantName: 'group-is-active', isGroup: true },
				{ variantName: 'group-swiper-slide-active', isGroup: true },
				{
					variantName: 'group-swiper-slide-duplicate-active',
					isGroup: true,
				},
			]

			variants.forEach(
				({ variantName, selectorName, isGroup, isTheme }) => {
					addVariant(
						variantName,
						({ modifySelectors, separator }) => {
							modifySelectors(({ className }) => {
								if (isGroup) {
									return `.${variantName.replace(
										'group-',
										'group.'
									)} .${e(
										`${selectorName ||
											variantName}${separator}${className}`
									)}`
								}

								return `.${selectorName || variantName}.${e(
									`${selectorName ||
										variantName}${separator}${className}`
								)}`
							})
						}
					)
				}
			)

			addVariant('sibling-checked', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.sibling-checked:checked ~ .${e(
						`sibling-checked${separator}${className}`
					)}`
				})
			})
		}),
	],
}
