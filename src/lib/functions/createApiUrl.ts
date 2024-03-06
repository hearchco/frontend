import { env } from '$env/dynamic/private';

export function createApiUrl(path: string, params?: string): string {
	const apiUri: string | undefined = env.API_URI;
	if (apiUri === undefined) {
		throw new Error('API_URI env is not defined');
	}

	return (apiUri.endsWith('/') ? apiUri : apiUri + '/') + path + (params ? `?${params}` : '');
}
