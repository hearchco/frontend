import { error } from '@sveltejs/kit';
import { createApiUrl } from '$lib/functions/api/createurl';
import { concatSearchParams } from './concatparams';

/**
 * Create a public API URL for the proxy image endpoint.
 * @param {string} url
 * @param {string} hash
 * @param {boolean} [favicon]
 * @returns {string}
 */
export function proxyImageLink(url, hash, favicon = false) {
	const params = concatSearchParams([
		['hash', hash],
		['url', url],
		['favicon', favicon.toString()]
	]);

	/** @type {URL} */
	let apiUrl;
	try {
		apiUrl = createApiUrl('proxy', params);
	} catch (/** @type {any} */ err) {
		// Internal Server Error.
		throw error(500, `Failed to create API URL: ${err.message}`);
	}

	return apiUrl.toString();
}

/**
 * Create a public API URL for the proxy favicon image endpoint.
 * @param {string} url
 * @param {string} hash
 * @returns {string}
 */
export function proxyFaviconLink(url, hash) {
	const uriPattern = '^(http(s?))(://)([^/]+)';
	const uriRegex = new RegExp(uriPattern);
	const uriMatch = url.match(uriRegex);

	if (!uriMatch || uriMatch.length == 0) {
		throw error(400, 'Invalid URL');
	}

	const uri = uriMatch[0];
	return proxyImageLink(uri, hash, true);
}
