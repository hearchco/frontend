import { env } from '$env/dynamic/private';
import { createArbitraryUrl, encodeUrlParams } from '$lib/functions/urlutils';

export function createApiUrl(path: string, params?: URLSearchParams): URL {
	const apiUri: string | undefined = env.API_URI;
	if (apiUri === undefined) {
		throw new Error('API_URI env is not defined');
	}

	// encoding when creating API URLs since they run on the server
	return encodeUrlParams(createArbitraryUrl(apiUri, path, params));
}
