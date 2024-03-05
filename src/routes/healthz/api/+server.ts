import { error } from '@sveltejs/kit';
import { createApiUrl } from '$lib/functions/createApiUrl';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	const apiUrl = createApiUrl('healthz');
	const response = await fetch(apiUrl);

	if (response.status >= 400 && response.status <= 599) {
		throw error(response.status, response.statusText);
	}
	return new Response(response.statusText);
};
