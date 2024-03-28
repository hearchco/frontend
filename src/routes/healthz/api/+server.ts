import { createApiUrl } from '$lib/functions/createApiUrl';
import { error } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	let apiUrl: string;
	try {
		apiUrl = createApiUrl('healthz');
	} catch (err: any) {
		// Internal Server Error
		throw error(500, `Failed to create API URL: ${err.message}`);
	}

	let response: Response;
	try {
		response = await fetch(apiUrl);
	} catch (err: any) {
		// Service Unavailable
		throw error(503, `Failed to fetch healthz: ${err.message}`);
	}

	let message: string;
	try {
		message = await response.text();
	} catch (err: any) {
		// Internal Server Error
		throw error(500, `Failed to get message: ${err.message}`);
	}

	if (response.status >= 400 && response.status <= 599) {
		// same as backend
		throw error(response.status, message);
	}

	return new Response(message);
};
