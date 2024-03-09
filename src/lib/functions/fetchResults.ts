import { error } from '@sveltejs/kit';
import { sleep } from '$lib/functions/sleep';
import { createApiUrl } from '$lib/functions/createApiUrl';

import type { ResultType, ErrorResponseType } from '$lib/types/result';

export async function fetchResultsJSON(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	setHeaders: (headers: Record<string, string>) => void,
	params: string,
	delay: number
): Promise<ResultType[]> {
	const delayed: Promise<void> = sleep(delay);

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

	let jsonResponse: ResultType[] | ErrorResponseType;
	try {
		jsonResponse = await response.json();
	} catch (err: any) {
		await delayed;
		// Internal Server Error
		throw error(500, `Failed to parse results: ${err.message}`);
	}

	if ('message' in jsonResponse && 'value' in jsonResponse) {
		await delayed;
		// same as backend
		throw error(response.status, `${jsonResponse.message}: ${jsonResponse.value}`);
	}

	const age: string | null = response.headers.get('age');
	const cacheControl: string | null = response.headers.get('cache-control');
	setHeaders({
		age: age !== null ? age : '0',
		'cache-control': cacheControl !== null ? cacheControl : 'no-cache'
	});

	const results: ResultType[] = jsonResponse;
	await delayed;
	return results;
}

export async function delayFakeFetch(delay: number): Promise<ResultType[]> {
	await sleep(delay);
	return [];
}
