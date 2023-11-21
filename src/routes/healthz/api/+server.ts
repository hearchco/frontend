import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	const apiUrl = `${env.PUBLIC_API_URL_SSR}/healthz`;
	const response = await fetch(apiUrl);
	if (response.status !== 200) {
		throw error(response.status, 'API is not healthy');
	}
	return new Response('API is healthy');
};
