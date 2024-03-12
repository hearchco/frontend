import { categoryFrom } from '$lib/functions/categoryFrom';
import { delayFakeFetch, fetchResultsJSON } from '$lib/functions/fetchResults';

import type { PageServerLoad } from './$types';
import type { ResultType } from '$lib/types/result';

export const load: PageServerLoad = async ({ fetch, setHeaders, url }) => {
	let query: string;
	let results: Promise<ResultType[]>;

	const q: string | null = url.searchParams.get('q');
	if (q !== null && q !== '' && q !== `!${categoryFrom(q)}`) {
		query = q;
		const params: string = `${url.searchParams}`;
		results = fetchResultsJSON(fetch, setHeaders, params, 500);
	} else {
		query = '';
		results = delayFakeFetch(200);
	}

	const currentPage: string | null = url.searchParams.get('start');
	const maxPages: string | null = url.searchParams.get('pages');

	return {
		query: query,
		currentPage: currentPage === null ? 1 : parseInt(currentPage, 10),
		maxPages: maxPages === null ? 1 : parseInt(maxPages, 10),
		streamed: {
			results: results
		}
	};
};
