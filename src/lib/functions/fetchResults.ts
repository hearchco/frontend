import { createApiUrl } from './createApiUrl';

import type { ResultType } from '$lib/types/result';

export async function fetchResultsJSON(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	setHeaders: (headers: Record<string, string>) => void,
	params: string
): Promise<ResultType[]> {
	let apiUrl: string;
	try {
		apiUrl = createApiUrl('search', params);
	} catch (err) {
		// crash the server if we can't create the API URL
		throw new Error('Failed to create API URL: ' + err);
	}

	let response: Response;
	try {
		response = await fetch(apiUrl);
	} catch (err) {
		// don't crash the server if we can't fetch the results
		console.error('Failed to fetch results:', err);
		return [];
	}

	const age: string | null = response.headers.get('age');
	const cacheControl: string | null = response.headers.get('cache-control');
	if (age !== null && cacheControl !== null) {
		setHeaders({
			age: age,
			'cache-control': cacheControl
		});
	}

	let results: ResultType[];
	try {
		results = await response.json();
	} catch (err) {
		// don't crash the server if we can't parse the results
		console.error('Failed to parse results:', err);
		return [];
	}

	return results;
}
