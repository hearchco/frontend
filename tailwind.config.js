/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'hearchco-primary': '#9a3e00',
				'hearchco-secondary': '#ffb380'
			},
			animation: {
				swing: 'swing 1.5s',
				'swing-infinite': 'swing-infinite 1s linear infinite'
			},
			keyframes: {
				swing: {
					'20%': { transform: 'rotate3d(0, 0, 1, 15deg)' },
					'40%': { transform: 'rotate3d(0, 0, 1, -10deg)' },
					'60%': { transform: 'rotate3d(0, 0, 1, 5deg)' },
					'80%': { transform: 'rotate3d(0, 0, 1, -5deg)' },
					to: { transform: 'rotate3d(0, 0, 1, 0deg)' }
				},
				'swing-infinite': {
					'25%': { transform: 'rotate(10deg)' },
					'50%': { transform: 'rotate(0deg)' },
					'75%': { transform: 'rotate(-10deg)' },
					to: { transform: 'rotate(0deg)' }
				}
			},
			gridTemplateColumns: {
				fit: 'repeat(auto-fit, minmax(168px, 1fr))',
				'sm-fit': 'repeat(auto-fit, minmax(28dvw, 1fr))'
			},
			screens: {
				xs: '475px',
				'2xs': '400px',
				'3xs': '320px',
				'4xs': '260px',
				'5xs': '200px'
			}
		}
	},
	plugins: []
};
