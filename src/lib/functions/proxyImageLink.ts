import { error } from '@sveltejs/kit';
import { createPublicApiUrl } from '$lib/functions/createPublicApiUrl';

export function proxyImageLink(url: string, hash: string): URL {
	const params: URLSearchParams = new URLSearchParams();
	params.set('url', url);
	params.set('hash', hash);

	let apiUrl: URL;
	try {
		apiUrl = createPublicApiUrl('proxy', params);
	} catch (err: any) {
		// Internal Server Error
		throw error(500, `Failed to create API URL: ${err.message}`);
	}

	return apiUrl;
}
