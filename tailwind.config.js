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
				swing: 'swing 1.5s'
			},
			keyframes: {
				swing: {
					'20%': { transform: 'rotate3d(0, 0, 1, 15deg)' },
					'40%': { transform: 'rotate3d(0, 0, 1, -10deg)' },
					'60%': { transform: 'rotate3d(0, 0, 1, 5deg)' },
					'80%': { transform: 'rotate3d(0, 0, 1, -5deg)' },
					to: { transform: 'rotate3d(0, 0, 1, 0deg)' }
				}
			},
			gridTemplateColumns: {
				'fit': 'repeat(auto-fit, minmax(168px, 1fr))',
				'sm-fit': 'repeat(auto-fit, minmax(28dvw, 1fr))'
			}
		}
	},
	plugins: []
};
