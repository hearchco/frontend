import { concatSearchParams } from './concatparams';
import { fetchAPI } from './fetchapigeneric';

/**
 * Fetches /currencies from the API.
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<CurrenciesResponseType>}
 */
export async function fetchCurrencies(fetcher = fetch) {
	return await fetchAPI(fetcher, '/exchange/currencies');
}

// /**
//  * Fetches /exchange with params from the API.
//  * @param {URLSearchParams} params
//  * @param {typeof fetch} [fetcher]
//  * @returns {Promise<ExchangeResponseType>}
//  */
// export async function fetchExchange(params, fetcher = fetch) {
// 	return await fetchAPI(fetcher, '/exchange', params);
// }

/**
 * Fetches /search/web with params from the API.
 * @param {URLSearchParams} params
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<WebResultsResponseType>}
 */
export async function fetchWebResults(params, fetcher = fetch) {
	return await fetchAPI(fetcher, '/search/web', params);
}

/**
 * Fetches /search/images with params from the API.
 * @param {URLSearchParams} params
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<ImagesResultsResponseType>}
 */
export async function fetchImagesResults(params, fetcher = fetch) {
	return await fetchAPI(fetcher, '/search/images', params);
}

/**
 * Fetches /search/suggestions with query from the API.
 * @param {string} query
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<SuggestionsResultsResponseType>}
 */
export async function fetchSuggestionsResults(query, fetcher = fetch) {
	/** @type {URLSearchParams} */
	const params = concatSearchParams([
		['q', query],
		['output', 'json']
	]);

	return await fetchAPI(fetcher, '/search/suggestions', params);
}
