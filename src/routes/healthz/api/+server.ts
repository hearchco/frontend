import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

import type { NumericRange } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	const apiUrl = `${env.API_URL}/healthz`;
	const response = await fetch(apiUrl);
	if (response.status >= 400 && response.status <= 599) {
		// todo: convert number to NumericRange
		const status: NumericRange<400, 599> = 500;
		throw error(status, 'ERROR');
	}
	return new Response('OK');
};
