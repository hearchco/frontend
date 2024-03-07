import { error } from '@sveltejs/kit';
import { createApiUrl } from './createApiUrl';
import { sleep } from './sleep';

import type { ResultType } from '$lib/types/result';

export async function fetchResultsJSON(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	setHeaders: (headers: Record<string, string>) => void,
	params: string,
	delay: number
): Promise<ResultType[]> {
	const delayed = sleep(delay);

	let apiUrl: string;
	try {
		apiUrl = createApiUrl('search', params);
	} catch (err: any) {
		await delayed;
		// Internal Server Error
		throw error(500, `Failed to create API URL: ${err.message}`);
	}

	let response: Response;
	try {
		response = await fetch(apiUrl);
	} catch (err: any) {
		await delayed;
		// Service Unavailable
		throw error(503, `Failed to fetch results: ${err.message}`);
	}

	const age: string | null = response.headers.get('age');
	const cacheControl: string | null = response.headers.get('cache-control');
	setHeaders({
		age: age !== null ? age : '0',
		'cache-control': cacheControl !== null ? cacheControl : 'no-cache'
	});

	let results: ResultType[];
	try {
		results = await response.json();
	} catch (err: any) {
		await delayed;
		// Internal Server Error
		throw error(500, `Failed to parse results: ${err.message}`);
	}

	await delayed;
	return results;
}

export async function delayFakeFetch(delay: number): Promise<ResultType[]> {
	await sleep(delay);
	return [];
}
