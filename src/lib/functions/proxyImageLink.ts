import { error } from '@sveltejs/kit';
import { createPublicApiUrl } from '$lib/functions/createPublicApiUrl';

export function proxyImageLink(url: string, hash: string): string {
	const params: string = 'url=' + encodeURIComponent(url) + '&hash=' + hash;

	let apiUrl: string;
	try {
		apiUrl = createPublicApiUrl('proxy', params);
	} catch (err: any) {
		// Internal Server Error
		throw error(500, `Failed to create API URL: ${err.message}`);
	}

	return apiUrl;
}
