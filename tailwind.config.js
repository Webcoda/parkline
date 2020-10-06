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
	purge: [],
	theme: {
		extend: {
			spacing: {
				'9.5': '2.375rem',
				'13.5': '3.375rem',
			},
			borderColor: theme => ({
				...theme('colors'),
				default: '#d8d8d8',
			}),
			borderWidth: {
				'5': '5px',
			},
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
			font: {
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
			},
		},
	},
	variants: {
		display: ['responsive', 'collapsed', 'active'],
		opacity: [
			'responsive',
			'hover',
			'focus',
			'collapsed',
			'active',
			'hocus',
		],
		textColor: ['hover', 'focus', 'active', 'hocus'],
		backgroundColor: ['responsive', 'hover', 'focus', 'hocus'],
		borderWidth: ['first', 'last'],
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
				{ variantName: 'is-active', isGroup: true },
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

								return `.${variantName}.${e(
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
