import { error } from '@sveltejs/kit';
import { createApiUrl } from './createurl';

/**
 * @template T
 * @param {typeof fetch} fetcher
 * @param {string} path
 * @param {URLSearchParams} [params]
 * @returns {Promise<T>}
 */
export async function fetchAPI(fetcher, path, params) {
	/** @type {URL} */
	let apiUrl;
	try {
		apiUrl = createApiUrl(path, params);
	} catch (err) {
		// Internal Server Error.
		throw error(500, `Failed to create API URL: ${err}`);
	}

	/** @type {Response} */
	let response;
	try {
		// Fetch the results from the API.
		response = await fetcher(apiUrl, {
			method: 'GET', // POST doesn't cache on CDN.
			headers: {
				Accept: 'application/json',
				'Accept-Encoding': 'gzip, deflate, br'
			}
		});
	} catch (err) {
		// Bad Gateway.
		throw error(502, `Failed to fetch: ${err}`);
	}

	// Check if the response is OK, otherwise handle the error.
	if (!response.ok) {
		// Try to read the response body as text.
		let responseBody;
		try {
			responseBody = await response.text();
		} catch (err) {
			responseBody = `Failed to read response body: ${err}`;
		}

		// Same as the API.
		throw error(
			response.status,
			`Response from API not OK (${response.statusText}): ${responseBody}`
		);
	}

	/** @type {T | ErrorResponseType} */
	let jsonResponse;
	try {
		// Parse the response body as JSON.
		jsonResponse = await response.json();
	} catch (err) {
		/** @type {string} */
		let textResponse;
		try {
			// Try to read the response body as text.
			textResponse = await response.text();
		} catch (textErr) {
			// Bad Gateway.
			throw error(
				502,
				`Failed to read response body: ${textErr} (${response.status} ${response.statusText}): ${err}`
			);
		}

		// Internal Server Error.
		throw error(
			500,
			`Failed to parse JSON body: ${err} (${response.status} ${response.statusText}): ${textResponse}`
		);
	}

	// Check if the response is an error from the API (ErrorResponseType).
	if (isErrorResponse(jsonResponse)) {
		// Same as the API.
		throw error(
			response.status,
			`Response from API is an error: ${jsonResponse.message}: ${jsonResponse.value}`
		);
	}

	return jsonResponse;
}

/**
 * Type guard to check if the response is an ErrorResponseType.
 *
 * @param {any} response
 * @returns {response is ErrorResponseType}
 */
function isErrorResponse(response) {
	return typeof response === 'object' && 'message' in response && 'value' in response;
}
