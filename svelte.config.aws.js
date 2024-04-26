import adapter from '@hearchco/sveltekit-adapter-aws';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			edge: true,
			stream: true
		})
	}
};

export default config;
