import { error } from '@sveltejs/kit';
import { createApiUrl } from '$lib/functions/api/createurl.js';

/**
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<string>}
 */
export async function fetchVersion(fetcher = fetch) {
	/** @type {URL} */
	let apiUrl;
	try {
		apiUrl = createApiUrl('versionz');
	} catch (err) {
		// Internal Server Error.
		throw error(500, `Failed to create API URL: ${err}`);
	}

	/** @type {Response} */
	let response;
	try {
		response = await fetcher(apiUrl, {
			method: 'GET', // POST doesn't cache on CDN.
			headers: {
				Accept: 'text/plain',
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

	/** @type {string} */
	let version;
	try {
		version = await response.text();
	} catch (err) {
		// Bad Gateway.
		throw error(502, `Failed to read response body: ${err}`);
	}

	return version;
}
