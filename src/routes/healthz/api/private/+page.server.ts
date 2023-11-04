export const csr = false;

import type { PageServerLoad } from './$types';
import { env as envPriv } from '$env/dynamic/private';
import { env as envPub } from '$env/dynamic/public';

export const load: PageServerLoad = async ({ fetch }) => {
	const apiUrl = `${envPriv.API_URL}/healthz`;
	const response = await fetch(apiUrl, {
		headers: {
			origin: `${envPub.PUBLIC_API_URL}`
		}
	});

	return {
		status: response.status
	};
};
