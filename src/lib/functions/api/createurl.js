import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';

/**
 * Create an API URL.
 * @param {string} [path]
 * @param {URLSearchParams} [params]
 * @returns {URL}
 */
export function createApiUrl(path = '/', params = new URLSearchParams()) {
	const apiUri = env.PUBLIC_API_URI;
	if (!apiUri) {
		// Internal Server Error.
		throw error(500, 'PUBLIC_API_URI env is not defined');
	}
	console.debug('API URI:', apiUri);

	console.debug('Path:', path);
	const urll = new URL(path, apiUri);
	console.debug('API URL:', urll);

	console.debug('Params:', params);
	console.debug('Params string:', params.toString());
	for (const [key, value] of params.entries()) {
		urll.searchParams.append(key, value);
	}
	console.debug('API URL with params:', urll);

	return urll;
}
