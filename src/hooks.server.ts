import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (!request.headers.has('origin')) {
		request.headers.set('origin', event.url.origin);
	}
	return fetch(request);
};
