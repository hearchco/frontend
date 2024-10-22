import { fetchAPI } from './fetchapi';

/**
 * @param {URLSearchParams} params
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<ResultsResponseType>}
 */
export async function fetchResults(params, fetcher = fetch) {
	return await fetchAPI(fetcher, 'search', params);
}
