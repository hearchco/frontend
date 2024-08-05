/**
 * Check if query is an exchange gadget query
 * @param {string} query - Query to be checked
 * @returns {boolean} - Whether query is an exchange gadget query or not
 */
export function exchangery(query) {
	// Check if the query is in format "<amount> <currency1> to/in <currency2>"
	// where <currency1> and <currency2> are 3-letter currency codes
	const regex = /^\d+(\.\d+)? [a-zA-Z]{3} (to|in) [a-zA-Z]{3}$/;
	return regex.test(query);
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
	if (!exchangery(query)) {
		throw new Error('Invalid exchange query');
	}

	const parts = query.split(' ');
	const amount = parseFloat(parts[0]);
	const from = parts[1].toUpperCase();
	const to = parts[3].toUpperCase();
	return { from, to, amount };
}
