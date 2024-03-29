import { error } from '@sveltejs/kit';
import { createPublicApiUrl } from '$lib/functions/createPublicApiUrl';

import type { ResultType, ErrorResponseType } from '$lib/types/result';

export async function fetchPublicResultsJSON(params: URLSearchParams): Promise<ResultType[]> {
	let apiUrl: URL;
	try {
		apiUrl = createPublicApiUrl('search', params);
	} catch (err: any) {
		// Internal Server Error
		throw error(500, `Failed to create API URL: ${err.message}`);
	}

	let response: Response;
	try {
		response = await fetch(apiUrl);
	} catch (err: any) {
		// Service Unavailable
		throw error(503, `Failed to fetch results: ${err.message}`);
	}

	let jsonResponse: ResultType[] | ErrorResponseType;
	try {
		jsonResponse = await response.json();
	} catch (err: any) {
		// Internal Server Error
		throw error(500, `Failed to parse results: ${err.message}`);
	}

	if ('message' in jsonResponse && 'value' in jsonResponse) {
		// same as backend
		throw error(response.status, `${jsonResponse.message}: ${jsonResponse.value}`);
	}

	const results: ResultType[] = jsonResponse;
	return results;
}
