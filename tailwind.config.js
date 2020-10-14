const plugin = require('tailwindcss/plugin')

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
			whitelistPatterns: [/swiper-/],
		},
	},
	theme: {
		extend: {
			spacing: {
				'7.5': '1.875rem',
				'9.5': '2.375rem',
				'13.5': '3.375rem',
				'22': '5.5rem',
				'23': '5.75rem',
				'30': '7.5rem',
				'32.5': '8.125rem',
				'44': '11rem', //176px
				'45': '11.25rem', //180px
				'115': '28.75rem', //460px
				'1/10': '10%',
				'7/10': '70%',
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
		},
	},
	variants: {
		backgroundColor: [
			'responsive',
			'hover',
			'focus',
			'group-hocus',
			'is-active',
		],
		borderWidth: ['first', 'last'],
		display: ['responsive', 'collapsed', 'is-active'],
		opacity: [
			'responsive',
			'hover',
			'focus',
			'collapsed',
			'is-active',
			'hocus',
			'group-hocus',
		],
		padding: ['responsive', 'first', 'last'],
		textColor: ['hover', 'focus', 'is-active', 'hocus', 'group-hocus'],
		textDecoration: ['responsive', 'hover', 'focus', 'hocus'],
		translate: [
			'responsive',
			'hover',
			'focus',
			'group-active',
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
				md: '992px',
				lg: '1200px',
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
