import { error } from '@sveltejs/kit';

/**
 * Converts an array of search params into a URLSearchParams object and sorts it.
 * @param {string[][]} params - Search params.
 * @returns {URLSearchParams} - Sorted search params object.
 */
export function concatSearchParams(params) {
	const nonEmptyParams = params.filter((param) => param[1] !== '');
	let paramsObj;

	try {
		paramsObj = new URLSearchParams(nonEmptyParams);
	} catch (err) {
		// Internal Server Error.
		throw error(500, `Failed to create URLSearchParams: ${err}`);
	}

	paramsObj.sort();
	return paramsObj;
}
