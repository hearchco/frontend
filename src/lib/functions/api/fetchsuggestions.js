import { concatSearchParams } from './concatparams';
import { fetchAPI } from './fetchapi';

/**
 * @param {string} query
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<SuggestionType[]>}
 */
export async function fetchSuggestions(query, fetcher = fetch) {
	/** @type {URLSearchParams} */
	const params = concatSearchParams([
		['q', query],
		['output', 'json']
	]);

	/** @type {SuggestionsResponseType} */
	const response = await fetchAPI(fetcher, 'suggestions', params);

	return response.suggestions;
}
