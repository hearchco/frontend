import { categoryFrom } from '$lib/functions/categoryFrom';
import { fetchResultsJSON } from '$lib/functions/fetchResults';

import type { PageServerLoad } from './$types';
import type { ResultType } from '$lib/types/result';

async function resultsWithDelay(
	delay: number,
	results: Promise<ResultType[]>
): Promise<ResultType[]> {
	await new Promise((resolve) => setTimeout(resolve, delay));
	return results;
}

export const load: PageServerLoad = async ({ fetch, setHeaders, url }) => {
	let results: Promise<ResultType[]>;
	const q: string | null = url.searchParams.get('q');
	if (q === null || q === '' || q === `!${categoryFrom(q)}`) {
		results = new Promise((resolve) => resolve([]));
		return {
			query: '',
			streamed: {
				results: resultsWithDelay(200, results)
			}
		};
	}

	results = fetchResultsJSON(fetch, setHeaders, `${url.searchParams}`);
	return {
		query: q,
		streamed: {
			results: resultsWithDelay(500, results)
		}
	};
};
