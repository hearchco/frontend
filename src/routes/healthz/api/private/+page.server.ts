export const csr = false;

import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const apiUrl = `${env.API_URL}/healthz`;
	const response = await fetch(apiUrl);

	return {
		status: response.status
	};
};
