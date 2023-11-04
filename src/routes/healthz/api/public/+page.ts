export const ssr = false;

import type { PageLoad } from './$types';
import { env } from '$env/dynamic/public';

export const load: PageLoad = async ({ fetch }) => {
	const apiUrl = `${env.PUBLIC_API_URL}/healthz`;
	const response = await fetch(apiUrl);

	return {
		status: response.status
	};
};
