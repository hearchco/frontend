import type { PageServerLoad } from './$types';
import { API_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch }) => {
	const apiUrl = `${API_URL}/healthz`;
	const response = await fetch(apiUrl);

	return {
		status: response.status
	};
};
