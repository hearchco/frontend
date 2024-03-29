import { env } from '$env/dynamic/private';

export function createApiUrl(path: string, params?: URLSearchParams): URL {
	const apiUri: string | undefined = env.API_URI;
	if (apiUri === undefined) {
		throw new Error('API_URI env is not defined');
	}

	const apiUrl: string = (apiUri.endsWith('/') ? apiUri : apiUri + '/') + path;
	const urll: URL = new URL(apiUrl);

	if (params !== undefined) {
		for (const [key, value] of params) {
			if (key !== 'hash') {
				urll.searchParams.set(key, encodeURIComponent(value));
			}
		}
	}

	return urll;
}
