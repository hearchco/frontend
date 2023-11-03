import type { HandleFetch } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (request.url.startsWith(`${env.PRIVATE_API_URL}`)) {
		request.headers.set('Origin', `${event.request.headers.get('Host')}`);
	}

	return fetch(request);
};
