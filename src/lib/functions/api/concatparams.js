/**
 * Concatenate search params
 * @param {Record<string, string>} searchParamsMap - Array of search params
 * @returns {URLSearchParams} - Concatenated search params
 */
export function concatSearchParams(searchParamsMap) {
	// Convert search params map to array avoiding empty values
	const searchParamsArray = Object.entries(searchParamsMap).map(([key, value]) =>
		value !== '' ? `${key}=${value}` : ''
	);

	return new URLSearchParams(
		`?${searchParamsArray
			.filter((param) => param !== '')
			.sort()
			.join('&')}`
	);
}
