import { env } from '$env/dynamic/private';

export function createApiUrl(path: string, params?: URLSearchParams): string {
	const apiUri: string | undefined = env.API_URI;
	if (apiUri === undefined) {
		throw new Error('API_URI env is not defined');
	}

	const paramsString: string | undefined = params ? params.toString() : undefined;
	return (apiUri.endsWith('/') ? apiUri : apiUri + '/') + path + (paramsString ? `?${paramsString}` : '');
}
