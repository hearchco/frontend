import { env } from '$env/dynamic/private';
import { createArbitraryUrl } from '$lib/functions/urlutils';

export function createApiUrl(path: string, params?: URLSearchParams): URL {
	const apiUri: string | undefined = env.API_URI;
	if (apiUri === undefined) {
		throw new Error('API_URI env is not defined');
	}

	return createArbitraryUrl(apiUri, path, params);
}
