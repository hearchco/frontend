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
				Accept: 'text/plain',
				'Accept-Encoding': 'gzip, deflate, br'
			}
		});
	} catch (/** @type {any} */ err) {
		// Bad Gateway
		throw error(502, `Failed to fetch version: ${err.message}`);
	}

	/** @type {string} */
	const version = await response.text();

	return version;
}
