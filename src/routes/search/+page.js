import { browser } from '$app/environment';

/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		browser: browser,
		query: data.query,
		currentPage: data.currentPage,
		maxPages: data.maxPages,
		category: data.category,
		results: data.results,
		timing: data.timing
	};
}
