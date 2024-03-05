import { env } from '$env/dynamic/private';

export function createApiUrl(path: string, params?: string) {
	const apiUri = env.API_URI;
	if (apiUri === undefined) {
		throw new Error('API_URI env is not defined');
	}

	const apiUrl =
		(apiUri.endsWith('/') ? apiUri : apiUri + '/') + path + (params ? `?${params}` : '');

	return apiUrl;
}
