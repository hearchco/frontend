import { fetchAPI } from './fetchapi';

/**
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<CurrenciesResponseType>}
 */
export async function fetchCurrencies(fetcher = fetch) {
	return await fetchAPI(fetcher, 'currencies');
}
