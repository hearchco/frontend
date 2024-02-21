import { env } from '$env/dynamic/private';

import type { ResultType } from '$lib/types/result';

export async function fetchResultsJSON(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	setHeaders: (headers: Record<string, string>) => void,
	params: string
) {
	const apiUrl = `${env.API_URL}/search?${params}`;
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
