import { error } from '@sveltejs/kit';
import { createApiUrl } from '$lib/functions/api/createurl.js';

/**
 * @param {string} query
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<SuggestionType[]>}
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

	/** @type {SuggestionsResponseType | ErrorResponseType} */
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
	}

	/** @type {SuggestionType[]} */
	const suggestions = jsonResponse.suggestions;

	return suggestions;
}
