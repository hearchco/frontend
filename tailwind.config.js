/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'hearchco-primary': '#9f3300',
				'hearchco-secondary': '#ffb380'
			},
			gridTemplateColumns: {
				'fit': 'repeat(auto-fit, minmax(200px, 1fr))'
			}
		}
	},
	plugins: []
};
