export const csr = false;

import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ fetch }) => {
	const apiUrl = `${env.API_URL}/healthz`;
	const response = await fetch(apiUrl);

	return {
		status: response.status
	};
};
