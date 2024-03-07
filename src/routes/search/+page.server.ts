import { categoryFrom } from '$lib/functions/categoryFrom';
import { delayFakeFetch, fetchResultsJSON } from '$lib/functions/fetchResults';

import type { PageServerLoad } from './$types';
import type { ResultType } from '$lib/types/result';

export const load: PageServerLoad = async ({ fetch, setHeaders, url }) => {
	let query: string = '';
	let results: Promise<ResultType[]> = delayFakeFetch(200);

	const q: string | null = url.searchParams.get('q');
	if (q !== null && q !== '' && q !== `!${categoryFrom(q)}`) {
		query = q;
		const params: string = `${url.searchParams}`;
		results = fetchResultsJSON(fetch, setHeaders, params, 500);
	}

	return {
		query: query,
		streamed: {
			results: results
		}
	};
};
