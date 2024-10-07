import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

import { getCategoryFromQuery, getQueryWithoutCategory } from '$lib/functions/query/category';
import { concatSearchParams } from '$lib/functions/api/concatparams';
import { fetchResults } from '$lib/functions/api/fetchresults';

import { CategoryEnum, toCategoryType } from '$lib/types/search/category';
import { exchangery, extractExchangeQuery } from '$lib/functions/query/gadgets/exchange';
import { fetchCurrencies } from '$lib/functions/api/fetchcurrencies';

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
	// Get query, current page, and max pages from URL.
	const query = url.searchParams.get('q') ?? '';
	console.debug('Query:', query);
	const currentPage = Number.parseInt(url.searchParams.get('start') ?? '1', 10);
	console.debug('Current page:', currentPage);
	const maxPages = Number.parseInt(url.searchParams.get('pages') ?? '1', 10);
	console.debug('Max pages:', maxPages);

	// Validate query, current page, and max pages.
	if (query === '') {
		// Bad Request.
		throw error(400, "Missing 'q' parameter");
	}
	if (Number.isNaN(currentPage) || currentPage <= 0) {
		// Bad Request.
		throw error(400, "Invalid 'start' parameter");
	}
	if (Number.isNaN(maxPages) || maxPages <= 0) {
		// Bad Request.
		throw error(400, "Invalid 'pages' parameter");
	}

	// Get category from URL or query (query takes precedence).
	const category = getCategory(query, url.searchParams);
	console.debug('Category:', category);

	// Remove category from query if it exists.
	const queryWithoutCategory = getQueryWithoutCategory(query);
	console.debug('Query without category:', queryWithoutCategory);
	if (queryWithoutCategory === '') {
		// Bad Request.
		throw error(400, "Only category specified in 'q' parameter");
	}

	// Concatenate search params.
	const newSearchParams = concatSearchParams([
		['q', queryWithoutCategory],
		['category', category !== CategoryEnum.GENERAL ? category : ''],
		['start', currentPage !== 1 ? currentPage.toString() : ''],
		['pages', maxPages !== 1 ? maxPages.toString() : '']
	]);
	console.debug('New search params:', newSearchParams);
	console.debug('New search params string:', newSearchParams.toString());

	// Fetch results.
	const respP = fetchResults(newSearchParams, fetch);

	// If not an exchange query, return results.
	if (!exchangery(queryWithoutCategory)) {
		const resp = await respP;
		return {
			browser: browser,
			query: queryWithoutCategory,
			currentPage: currentPage,
			maxPages: maxPages,
			category: category,
			results: resp.results,
			duration: resp.duration,
			exchange: null
		};
	}

	// Fetch exchange result.
	const { from, to, amount } = extractExchangeQuery(queryWithoutCategory);
	const currenciesP = fetchCurrencies();

	// Wait for all promises to resolve.
	const resp = await respP;
	const currencies = await currenciesP;

	return {
		browser: browser,
		query: queryWithoutCategory,
		currentPage: currentPage,
		maxPages: maxPages,
		category: category,
		results: resp.results,
		duration: resp.duration,
		exchange: {
			from: from,
			to: to,
			amount: amount,
			currencies: new Map(Object.entries(currencies.currencies))
		}
	};
}

/**
 * Get category from URL or query.
 * @param {string} query - Query from URL.
 * @param {URLSearchParams} params - Parameters.
 * @returns {string} - Category.
 * @throws {Error} - If category is invalid.
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

	// Check if category is valid.
	if (!category) {
		// Bad Request.
		throw error(400, "Invalid 'category' parameter in URL or query");
	}

	return category;
}
