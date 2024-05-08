import { error } from '@sveltejs/kit';
import { createApiUrl } from '$lib/functions/api/createurl';

/**
 * Create a public API URL for the proxy image endpoint
 * @param {string} url
 * @param {string} hash
 * @returns {string}
 */
export function proxyImageLink(url, hash) {
	// must be done like this instead of concatSearchParams because URL musn't be encoded
	const params = new URLSearchParams();
	// ordered alphabetically to increase cache hits
	params.set('hash', hash);
	params.set('url', url);

	/** @type {URL} */
	let apiUrl;
	try {
		apiUrl = createApiUrl('proxy', params);
	} catch (/** @type {any} */ err) {
		// Internal Server Error
		throw error(500, `Failed to create API URL: ${err.message}`);
	}

	return apiUrl.toString();
}
