import { env } from '$env/dynamic/private';

import type { ResultType } from '$lib/types/result';

export async function fetchResultsJSON(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	setHeaders: (headers: Record<string, string>) => void,
	params: string
) {
	const apiUri = env.API_URI;
	if (apiUri === undefined) {
		throw new Error('API_URI env is not defined');
	}

	const path = apiUri.endsWith('/') ? 'search?' : '/search?';
	const apiUrl = apiUri + path + params;

	const response = await fetch(apiUrl);

	const age = response.headers.get('age');
	const cacheControl = response.headers.get('cache-control');
	if (age != null && cacheControl != null) {
		setHeaders({
			age: age,
			'cache-control': cacheControl
		});
	}

	const results: ResultType[] = await response.json();
	return results;
}
