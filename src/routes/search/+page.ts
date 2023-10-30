import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageLoad = async ({ fetch, url }) => {
	const q = url.searchParams.get('q');
	if (q === null || q === '') {
		return {
			query: '',
			results: []
		};
	}
	const apiUrl = `${PUBLIC_API_URL}?q=${q}`;
	const response = await fetch(apiUrl);
	const results = await response.json();

	return {
		query: q,
		results: results
	};
};
