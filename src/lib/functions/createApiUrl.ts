import { env } from '$env/dynamic/private';

export function createApiUrl(path: string, params?: URLSearchParams): URL {
	const apiUri: string | undefined = env.API_URI;
	if (apiUri === undefined) {
		throw new Error('API_URI env is not defined');
	}

	const paramsString: string | undefined = params ? params.toString() : undefined;
	const urll: URL = new URL(
		(apiUri.endsWith('/') ? apiUri : apiUri + '/') + path + (paramsString ? `?${paramsString}` : '')
	);
	return urll;
}
