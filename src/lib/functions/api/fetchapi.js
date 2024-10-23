import { concatSearchParams } from './concatparams';
import { fetchAPI } from './fetchapigeneric';

/**
 * Fetches /currencies from the API.
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<CurrenciesResponseType>}
 */
export async function fetchCurrencies(fetcher = fetch) {
	return await fetchAPI(fetcher, 'currencies');
}

/**
 * Fetches /exchange with params from the API.
 * @param {URLSearchParams} params
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<ExchangeResponseType>}
 */
export async function fetchExchange(params, fetcher = fetch) {
	return await fetchAPI(fetcher, 'exchange', params);
}

/**
 * Fetches /search with params from the API.
 * @param {URLSearchParams} params
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<ResultsResponseType>}
 */
export async function fetchResults(params, fetcher = fetch) {
	return await fetchAPI(fetcher, 'search', params);
}

/**
 * Fetches /suggestions with query from the API.
 * @param {string} query
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<SuggestionsResponseType>}
 */
export async function fetchSuggestions(query, fetcher = fetch) {
	/** @type {URLSearchParams} */
	const params = concatSearchParams([
		['q', query],
		['output', 'json']
	]);

	return await fetchAPI(fetcher, 'suggestions', params);
}
