import { error } from '@sveltejs/kit';
import { createApiUrl } from '$lib/functions/api/createurl.js';

/**
 * @param {string} query
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<string[]>}
 */
export async function fetchSuggestions(query, fetcher = fetch) {
	/** @type {URLSearchParams} */
	const params = new URLSearchParams(`q=${query}`);

	/** @type {URL} */
	let apiUrl;
	try {
		apiUrl = createApiUrl('suggestions', params);
	} catch (/** @type {any} */ err) {
		// Internal Server Error
		throw error(500, `Failed to create API URL: ${err.message}`);
	}

	/** @type {Response} */
	let response;
	try {
		response = await fetcher(apiUrl, {
			method: 'GET', // POST doesn't cache on CDN
			headers: {
				Accept: 'application/json',
				'Accept-Encoding': 'gzip, deflate, br'
			}
		});
	} catch (/** @type {any} */ err) {
		// Bad Gateway
		throw error(502, `Failed to fetch suggestions: ${err.message}`);
	}

	/** @type {any[] | ErrorResponseType} */
	let jsonResponse;
	try {
		jsonResponse = await response.json();
	} catch (/** @type {any} */ err) {
		// Internal Server Error
		throw error(500, `Failed to parse suggestions: ${err.message}`);
	}

	if ('message' in jsonResponse && 'value' in jsonResponse) {
		// same as backend
		throw error(response.status, `API error: ${jsonResponse.message}: ${jsonResponse.value}`);
	} else if (!Array.isArray(jsonResponse) || jsonResponse.length !== 2) {
		// Bad Gateway
		throw error(502, `API error: Unexpected response format: not an array of length 2`);
	} else if (typeof jsonResponse[0] !== 'string' || !Array.isArray(jsonResponse[1])) {
		// Bad Gateway
		throw error(502, `API error: Unexpected response format: not a string followed by an array`);
	} else if (!jsonResponse[1].every((item) => typeof item === 'string')) {
		// Bad Gateway
		throw error(502, `API error: Unexpected response format: array contains non-string items`);
	}

	/** @type {string[]} */
	const suggestions = jsonResponse[1];

	return suggestions;
}
