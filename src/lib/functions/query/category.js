/**
 * Returns the category from the query.
 * @param {string} query
 * @returns {string}
 */
export function getCategoryFromQuery(query) {
	if (!query.startsWith('!')) {
		return '';
	}

	const firstSpaceIndex = query.indexOf(' ');
	if (firstSpaceIndex === -1) {
		return query.slice(1);
	}

	return query.slice(1, firstSpaceIndex);
}

/**
 * Returns the query without the category.
 * @param {string} query
 * @returns {string}
 */
export function getQueryWithoutCategory(query) {
	if (!query.startsWith('!')) {
		return query;
	}

	const firstSpaceIndex = query.indexOf(' ');
	if (firstSpaceIndex === -1) {
		return '';
	}

	return query.slice(firstSpaceIndex + 1);
}
