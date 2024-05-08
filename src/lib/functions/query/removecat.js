/**
 * Removes the category from a query if it exists
 * @param {string} query
 * @returns {string}
 */
export function removeCatFromQuery(query) {
	if (query.startsWith('!')) {
		return query.split(' ')[1] ?? '';
	} else {
		return query;
	}
}
