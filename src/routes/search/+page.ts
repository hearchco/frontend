import { env } from '$env/dynamic/public';
import { browser } from '$app/environment';

import type { PageLoad } from './$types';
import type { Result } from './types';

export const load: PageLoad = async ({ fetch, url, setHeaders }) => {
	const q = url.searchParams.get('q');
	if (q === null || q === '') {
		const results: Result[] = [];
		return {
			query: '',
			results: results
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
	const results: Result[] = await response.json();

	const age = response.headers.get('age');
	const cacheControl = response.headers.get('cache-control');
	if (age != null && cacheControl != null) {
		setHeaders({
			age: age,
			'cache-control': cacheControl
		});
	}

	return {
		query: q,
		results: results
	};
};
