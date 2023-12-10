import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	const apiUrl = `${env.API_URL}/healthz`;
	const response = await fetch(apiUrl);
	if (response.status !== 200) {
		throw error(response.status, 'API is not healthy');
	}
	return new Response('API is healthy');
};
