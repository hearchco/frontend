import adapter from '@hearchco/sveltekit-adapter-aws';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			edge: true,
			stream: false
		})
	},
	compilerOptions: {
		runes: true
	}
};

export default config;
