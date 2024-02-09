import type { PageServerLoad } from './$types';
import type { Result } from '$lib/components/ResultType';
import { fetchResultsJSON } from '$lib/functions/fetchResults';

export const load: PageServerLoad = async ({ fetch, setHeaders, url }) => {
	const q = url.searchParams.get('q');
	if (q === null || q === '') {
		const results: Result[] = [];
		return {
			query: '',
			streamed: {
				results: results
			}
		};
	}

	const results = fetchResultsJSON(fetch, setHeaders, `${url.searchParams}`);
	return {
		query: q,
		streamed: {
			results: results
		}
	};
};
