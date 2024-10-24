import { error } from '@sveltejs/kit';
import { createApiUrl } from '$lib/functions/api/createurl';
import { concatSearchParams } from './concatparams';

/**
 * Create a public API URL for the proxy image endpoint.
 * @param {string} url
 * @param {string} hash
 * @param {string} timestamp
 * @returns {string}
 */
export function proxyImageLink(url, hash, timestamp) {
	const params = concatSearchParams([
		['url', url],
		['hash', hash],
		['timestamp', timestamp]
	]);

	/** @type {URL} */
	let apiUrl;
	try {
		apiUrl = createApiUrl('proxy', params);
	} catch (err) {
		// Internal Server Error.
		throw error(500, `Failed to create API URL: ${err}`);
	}

	return apiUrl.toString();
}

/**
 * Create a public API URL for the proxy favicon image endpoint.
 * @param {string} fqdn
 * @param {string} hash
 * @param {string} timestamp
 * @returns {string}
 */
export function proxyFaviconLink(fqdn, hash, timestamp) {
	const params = concatSearchParams([
		['fqdn', fqdn],
		['hash', hash],
		['timestamp', timestamp]
	]);

	/** @type {URL} */
	let apiUrl;
	try {
		apiUrl = createApiUrl('proxy', params);
	} catch (err) {
		// Internal Server Error.
		throw error(500, `Failed to create API URL: ${err}`);
	}

	return apiUrl.toString();
}
