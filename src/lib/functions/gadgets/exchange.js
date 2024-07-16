import { concatSearchParams } from '$lib/functions/api/concatparams';
import { fetchExchange } from '$lib/functions/api/fetchexchange';

/**
 * Perform currency exchange
 * @param {string} from - Currency to be exchanged
 * @param {string} to - Currency to be exchanged to
 * @param {number} amount - Amount to be exchanged
 * @returns {Promise<number>} - Amount after exchange
 */
export async function exchange(from, to, amount) {
	const params = concatSearchParams({
		from: from,
		to: to,
		amount: amount.toString()
	});

	const resp = await fetchExchange(params);
	return resp.result;
}
