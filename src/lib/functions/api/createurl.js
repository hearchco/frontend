import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';

/**
 * Create an API URL.
 * @param {string} [path]
 * @param {URLSearchParams} [params]
 * @returns {URL}
 */
export function createApiUrl(path, params) {
	const apiUri = env.PUBLIC_API_URI;
	if (!apiUri) {
		// Internal Server Error.
		throw error(500, 'PUBLIC_API_URI env is not defined');
	}

	let urll;
	try {
		urll = new URL(path ?? '', apiUri);
		if (params) urll.search = params.toString();
	} catch (/** @type {any} */ err) {
		// Internal Server Error.
		throw error(500, `Failed to create URL: ${err.message}`);
	}

	return urll;
}
