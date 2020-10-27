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
					4.5,
					5.5,
					6.5,
					7.5,
					9.5,
					12,
					12.5,
					13.5,
					15,
					16,
					18,
					20,
					22,
					23,
					26,
					30,
					32.5,
					44,
					45,
					48,
					115
				]),
				'1/10': '10%',
				'7/10': '70%',
			},
			backgroundColor: {
				current: 'currentColor',
			},
			borderColor: theme => ({
				...theme('colors'),
				default: '#d8d8d8',
			}),
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
					'Aeonic',
					'"Helvetica Neue"',
					'Arial',
					'"Noto Sans"',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
				heading: 'Ranua, Arial, sans-serif',
			},
			inset: theme => ({
				...theme('spacing'),
			}),
			minHeight: theme => ({
				...theme('spacing'),
			}),
			maxWidth: theme => ({
				...theme('spacing'),
			})
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
		],
		padding: ['responsive', 'first', 'last'],
		textColor: ['hover', 'focus', 'is-active', 'hocus', 'group-hocus'],
		textDecoration: ['responsive', 'hover', 'focus', 'hocus'],
		translate: [
			'responsive',
			'hover',
			'focus',
			'is-active',
			'group-active',
			'group-hover',
			'group-hocus',
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
