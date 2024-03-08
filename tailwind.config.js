/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'hearchco-primary': '#ffb380',
				'hearchco-secondary': '#2b1100'
			}
		}
	},
	plugins: []
};
