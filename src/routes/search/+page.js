import { browser } from '$app/environment';

/** @type {import('./$types').PageLoad} */
export async function load() {
	return {
		browser: browser
	};
}
