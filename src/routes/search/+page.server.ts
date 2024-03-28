import { categoryFrom } from '$lib/functions/categoryFrom';
import { fetchResultsJSON, delayFakeFetch } from '$lib/functions/fetchResultsJSON';
import { parseIntParam } from '$lib/functions/parseIntParam';

import type { PageServerLoad } from './$types';
import type { ResultType } from '$lib/types/result';

export const load: PageServerLoad = async ({ fetch, setHeaders, url }) => {
	let query: string;
	let results: Promise<ResultType[]>;

	const q: string | null = url.searchParams.get('q');
	if (q !== null && q !== '' && q !== `!${categoryFrom(q)}`) {
		query = q;
		results = fetchResultsJSON(fetch, setHeaders, url.searchParams, 500);
	} else {
		query = '';
		results = delayFakeFetch(200);
	}

	const currentPage: number = parseIntParam(url, 'start', 1);
	const maxPages: number = parseIntParam(url, 'pages', 1);

	return {
		query: query,
		currentPage: currentPage,
		maxPages: maxPages,
		params: url.searchParams.toString(),
		streamed: {
			results: results
		}
	};
};
