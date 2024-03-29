import { env } from '$env/dynamic/public';
import { createArbitraryUrl } from '$lib/functions/urlutils';

export function createPublicApiUrl(path: string, params?: URLSearchParams): URL {
	const apiUri: string | undefined = env.PUBLIC_API_URI;
	if (apiUri === undefined) {
		throw new Error('PUBLIC_API_URI env is not defined');
	}

	return createArbitraryUrl(apiUri, path, params);
}
