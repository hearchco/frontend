import type { PageServerLoad } from './$types';
import { env as envPriv } from '$env/dynamic/private';
import { env as envPub } from '$env/dynamic/public';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const q = url.searchParams.get('q');
	if (q === null || q === '') {
		return {
			query: '',
			results: []
		};
	}
	const apiUrl = `${envPriv.API_URL}/search${url.searchParams}`;
	const response = await fetch(apiUrl, {
		headers: {
			origin: `${envPub.PUBLIC_API_URL}`
		}
	});
	const results = await response.json();

	return {
		query: q,
		results: results
	};
};
