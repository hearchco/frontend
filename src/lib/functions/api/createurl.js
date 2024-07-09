import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

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

	const apiUrl = (apiUri.endsWith('/') ? apiUri : apiUri + '/') + (path ?? '');
	const urll = new URL(apiUrl);

	if (params) {
		for (const [key, value] of params) {
			urll.searchParams.set(key, value);
		}
	}

	return urll;
}
