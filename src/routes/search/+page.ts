import type { PageLoad } from './$types';
import { env } from '$env/dynamic/public';

export const load: PageLoad = async ({ data, fetch, url }) => {
	// this runs on SSR (+page.server.ts)
	if (data != null) {
		return {
			query: data.query,
			results: data.results
		};
	}

	// this runs on CSR
	const q = url.searchParams.get('q');
	if (q === null || q === '') {
		return {
			query: '',
			results: []
		};
	}
	const apiUrl = `${env.PUBLIC_API_URL}/search?${url.searchParams}`;
	const response = await fetch(apiUrl);
	const results = await response.json();

	return {
		query: q,
		results: results
	};
};
