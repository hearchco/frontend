import { env } from '$env/dynamic/public';
import { browser } from '$app/environment';

import type { PageLoad } from './$types';
import type { Result } from './types';

async function fetchResultsJSON(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	setHeaders: (headers: Record<string, string>) => void,
	apiUrl: string
) {
	const response = await fetch(apiUrl);

	const age = response.headers.get('age');
	const cacheControl = response.headers.get('cache-control');
	if (age != null && cacheControl != null) {
		setHeaders({
			age: age,
			'cache-control': cacheControl
		});
	}

	const results: Result[] = await response.json();
	return results;
}

export const load: PageLoad = async ({ fetch, setHeaders, url }) => {
	const q = url.searchParams.get('q');
	if (q === null || q === '') {
		const results: Result[] = [];
		return {
			query: '',
			streamed: {
				results: results
			}
		};
	}

	let apiUri;
	if (!browser) {
		apiUri = env.PUBLIC_API_URL_SSR;
	} else {
		apiUri = env.PUBLIC_API_URL_CSR;
	}

	const apiUrl = `${apiUri}/search?${url.searchParams}`;
	const results = fetchResultsJSON(fetch, setHeaders, apiUrl);

	return {
		query: q,
		streamed: {
			results: browser ? results : await results
		}
	};
};
