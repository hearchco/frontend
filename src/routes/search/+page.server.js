import { error } from '@sveltejs/kit';

import { getCategoryFromQuery, getQueryWithoutCategory } from '$lib/functions/query/category';
import { concatSearchParams } from '$lib/functions/api/concatparams';
import { fetchResults } from '$lib/functions/api/fetchresults';

import { CategoryEnum, toCategoryType } from '$lib/types/search/category';

/**
 * Get category from URL or query
 * @param {string} query - Query from URL
 * @param {URLSearchParams} params - Parameters
 * @returns {string} - Category
 * @throws {Error} - If category is invalid
 */
function getCategory(query, params) {
	const categoryFromQuery = getCategoryFromQuery(query);
	const categoryParam = params.get('category') ?? '';
	const category =
		categoryFromQuery !== ''
			? toCategoryType(categoryFromQuery)
			: categoryParam !== ''
				? toCategoryType(categoryParam)
				: CategoryEnum.GENERAL;

	// Check if category is valid
	if (!category) {
		// Bad Request
		throw error(400, "Invalid 'category' parameter in URL or query");
	}

	return category;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, fetch }) {
	const renderStart = Date.now();

	// Get query, current page, and max pages from URL
	const query = url.searchParams.get('q') ?? '';
	const currentPage = parseInt(url.searchParams.get('start') ?? '1', 10);
	const maxPages = parseInt(url.searchParams.get('pages') ?? '1', 10);

	// Validate query, current page, and max pages
	if (query === '') {
		// Bad Request
		throw error(400, "Missing 'q' parameter");
	}
	if (isNaN(currentPage) || currentPage <= 0) {
		// Bad Request
		throw error(400, "Invalid 'start' parameter");
	}
	if (isNaN(maxPages) || maxPages <= 0) {
		// Bad Request
		throw error(400, "Invalid 'pages' parameter");
	}

	// Get category from URL or query (query takes precedence)
	const category = getCategory(query, url.searchParams);

	// Remove category from query if it exists
	const queryWithoutCategory = getQueryWithoutCategory(query);
	if (queryWithoutCategory === '') {
		// Bad Request
		throw error(400, "Only category specified in 'q' parameter");
	}

	// Concatenate search params
	const newSearchParams = concatSearchParams({
		q: queryWithoutCategory,
		category: category !== CategoryEnum.GENERAL ? category : '',
		start: currentPage !== 1 ? currentPage.toString() : '',
		pages: maxPages !== 1 ? maxPages.toString() : ''
	});

	// Fetch results
	const fetchStart = Date.now();
	const results = await fetchResults(newSearchParams, fetch);
	const fetchEnd = Date.now();

	return {
		query: queryWithoutCategory,
		currentPage: currentPage,
		maxPages: maxPages,
		category: category,
		results: results,
		timing: {
			render: {
				start: renderStart,
				end: Date.now()
			},
			api: {
				start: fetchStart,
				end: fetchEnd
			}
		}
	};
}
