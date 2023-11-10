export const ssr = false;

import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const apiUrl = `${env.PUBLIC_API_URL}/healthz`;
	const response = await fetch(apiUrl);

	return {
		status: response.status
	};
};
