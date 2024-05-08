import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
import { fetchResults } from '$lib/functions/api/fetchresults';
import { CategoryEnum } from '$lib/types/search/category';
import { removeCatFromQuery } from '$lib/functions/query/removecat';

/**
 * Get category from URL or query
 * @param {string} query - Query from URL
 * @param {URLSearchParams} params - URLSearchParams object
 * @returns {string} - Category
 * @throws {Error} - If category is invalid
 */
function getCategory(query, params) {
	const categoryFromQuery = query.startsWith('!') ? query.split(' ')[0].slice(1) : '';
	const categoryParam = params.get('category') ?? '';
	const category =
		categoryFromQuery !== ''
			? categoryFromQuery
			: categoryParam !== ''
				? categoryParam
				: CategoryEnum.GENERAL;

	// Check if category is valid
	if (!Object.values(CategoryEnum).includes(category)) {
		throw error(400, "Invalid 'category' parameter in URL or query");
	}

	return category;
}

/**
 * Concatenate search params
 * @param {string[]} searchParamsArray - Array of search params
 * @returns {URLSearchParams} - Concatenated search params
 */
function concatSearchParams(searchParamsArray) {
	return new URLSearchParams(
		`?${searchParamsArray
			.filter((param) => param !== '')
			.sort()
			.join('&')}`
	);
}

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
	// Get query, current page, and max pages from URL
	const query = url.searchParams.get('q') ?? '';
	const currentPage = parseInt(url.searchParams.get('start') ?? '1', 10);
	const maxPages = parseInt(url.searchParams.get('pages') ?? '1', 10);

	// Validate query, current page, and max pages
	if (query === '') {
		throw error(400, "Missing 'q' parameter");
	}
	if (isNaN(currentPage) || currentPage < 0) {
		throw error(400, "Invalid 'start' parameter");
	}
	if (isNaN(maxPages) || maxPages <= 0) {
		throw error(400, "Invalid 'pages' parameter");
	}

	// Get category from URL or query (query takes precedence)
	const category = getCategory(query, url.searchParams);

	// Remove category from query if it exists
	const queryWithoutCategory = removeCatFromQuery(query);
	if (queryWithoutCategory === '') {
		throw error(400, "Only category specified in 'q' parameter");
	}

	// Create new search params
	const newQueryParam = queryWithoutCategory !== '' ? `q=${queryWithoutCategory}` : '';
	const newCategoryParam =
		category !== '' && category !== CategoryEnum.GENERAL ? `&category=${category}` : '';
	const newStartParam = currentPage !== 1 ? `&start=${currentPage}` : '';
	const newPagesParam = maxPages !== 1 ? `&pages=${maxPages}` : '';

	// Concatenate search params
	const newSearchParams = concatSearchParams([
		newQueryParam,
		newCategoryParam,
		newStartParam,
		newPagesParam
	]);

	// Fetch results
	const results = await fetchResults(newSearchParams, fetch);

	return {
		browser: browser,
		query: queryWithoutCategory,
		currentPage: currentPage,
		maxPages: maxPages,
		category: category,
		results: results
	};
}
