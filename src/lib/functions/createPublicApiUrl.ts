import { env } from '$env/dynamic/public';

export function createPublicApiUrl(path: string, params?: string): string {
	const apiUri: string | undefined = env.PUBLIC_API_URI;
	if (apiUri === undefined) {
		throw new Error('PUBLIC_API_URI env is not defined');
	}

	return (apiUri.endsWith('/') ? apiUri : apiUri + '/') + path + (params ? `?${params}` : '');
}
