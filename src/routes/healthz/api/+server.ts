import { createApiUrl } from '$lib/functions/createApiUrl';
import { error } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	let apiUrl: string;
	try {
		apiUrl = createApiUrl('healthz');
	} catch (err) {
		// crash the server if we can't create the API URL
		throw new Error('Failed to create API URL: ' + err);
	}

	let response: Response;
	try {
		response = await fetch(apiUrl);
	} catch (err) {
		// don't crash the server if we can't fetch the results
		throw new Error('Failed to fetch healthz: ' + err);
	}

	if (response.status >= 400 && response.status <= 599) {
		// don't crash the server if the response is an error
		throw error(response.status, response.statusText);
	}

	return new Response(response.statusText);
};
