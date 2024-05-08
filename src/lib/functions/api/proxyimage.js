import { error } from '@sveltejs/kit';
import { createApiUrl } from '$lib/functions/api/createurl';

/**
 * Create a public API URL for the proxy image endpoint
 * @param {string} url
 * @param {string} hash
 * @returns {string}
 */
export function proxyImageLink(url, hash) {
	const params = new URLSearchParams();
	params.set('url', url);
	params.set('hash', hash);

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
