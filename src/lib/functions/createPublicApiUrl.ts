import { env } from '$env/dynamic/public';

export function createPublicApiUrl(path: string, params?: URLSearchParams): URL {
	const apiUri: string | undefined = env.PUBLIC_API_URI;
	if (apiUri === undefined) {
		throw new Error('PUBLIC_API_URI env is not defined');
	}

	const paramsString: string | undefined = params ? params.toString() : undefined;
	const urll: URL = new URL(
		(apiUri.endsWith('/') ? apiUri : apiUri + '/') + path + (paramsString ? `?${paramsString}` : '')
	);
	return urll;
}
