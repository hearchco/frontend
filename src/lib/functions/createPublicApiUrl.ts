import { env } from '$env/dynamic/public';

export function createPublicApiUrl(path: string, params?: URLSearchParams): URL {
	const apiUri: string | undefined = env.PUBLIC_API_URI;
	if (apiUri === undefined) {
		throw new Error('PUBLIC_API_URI env is not defined');
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
