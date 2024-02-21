import { fetchResultsJSON } from '$lib/functions/fetchResults';

import type { PageServerLoad } from './$types';
import type { ResultType } from '$lib/types/result';

export const load: PageServerLoad = async ({ fetch, setHeaders, url }) => {
	const q = url.searchParams.get('q');
	if (q === null || q === '') {
		const results: ResultType[] = [];
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
