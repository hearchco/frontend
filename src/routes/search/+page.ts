import type { PageLoad } from './$types';
import { env } from '$env/dynamic/public';
import { browser } from '$app/environment';

export const load: PageLoad = async ({ data, fetch, url }) => {
	const q = url.searchParams.get('q');
	if (q === null || q === '') {
		return {
			query: '',
			results: []
		};
	}

	let apiUri;
	if (!browser) {
		apiUri = env.PUBLIC_API_URL_SSR;
	} else {
		apiUri = env.PUBLIC_API_URL_CSR;
	}

	const apiUrl = `${apiUri}/search?${url.searchParams}`;
	const response = await fetch(apiUrl);
	const results = await response.json();

	return {
		query: q,
		results: results
	};
};
