import { fetchAPI } from './fetchapi';

/**
 * @param {URLSearchParams} params
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<ExchangeResponseType>}
 */
export async function fetchExchange(params, fetcher = fetch) {
	return await fetchAPI(fetcher, 'exchange', params);
}
