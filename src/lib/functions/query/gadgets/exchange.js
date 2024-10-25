import { getCurrencyCode } from '$lib/functions/gadgets/exchange';

const regex =
	/^(?<amount>\d+(\.\d+)?)(?:\s*)(?<from>[a-zA-Z]{3}|[a-zA-Z ]+)(?:\s*)(?:to|in)(?:\s*)(?<to>[a-zA-Z]{3}|[a-zA-Z ]+)$/;

/**
 * Check if query is an exchange gadget query
 * @param {string} query - Query to be checked
 * @returns {boolean} - Whether query is an exchange gadget query or not
 */
export function exchangery(query) {
	// Check if the query is in format "<amount> <currency1> to/in <currency2>"
	// where <currency1> and <currency2> are either 3-letter currency codes or currency names
	const match = query.match(regex);
	if (match === null || match.groups === undefined) return false;

	const fromCode = getCurrencyCode(match.groups.from);
	const toCode = getCurrencyCode(match.groups.to);
	return fromCode !== undefined && toCode !== undefined;
}

/**
 * @typedef {Object} ExchangeQueryType
 * @property {string} from - Currency to be exchanged
 * @property {string} to - Currency to be exchanged to
 * @property {number} amount - Amount to be exchanged
 */

/**
 * Extract exchange query parameters from query
 * @param {string} query - Query to be extracted
 * @returns {ExchangeQueryType} - Extracted parameters
 */
export function extractExchangeQuery(query) {
	const match = query.match(regex);
	if (match === null || match.groups === undefined) {
		throw new Error('Invalid exchange query');
	}

	const from = getCurrencyCode(match.groups.from);
	const to = getCurrencyCode(match.groups.to);
	const amount = Number.parseFloat(match.groups.amount);
	if (from === undefined || to === undefined) {
		throw new Error('Invalid exchange query');
	}

	return { from, to, amount };
}
