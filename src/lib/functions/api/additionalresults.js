import { fetchResults } from './fetchresults';

/**
 * Fetches additional results from the API and combines with the old results.
 * @param {ResultType[]} oldResults
 * @param {URLSearchParams} params
 * @returns {Promise<ResultType[]>}
 */
export async function fetchAdditionalResults(oldResults, params) {
	const resp = await fetchResults(params);
	const newResults = resp.results;

	// Get the last rank from old results.
	const lastRank = oldResults[oldResults.length - 1].rank;

	// Make the new results start from the last rank of the old results.
	for (const result of newResults) {
		result.rank += lastRank;
	}

	// Combine the old results with the new results (removing duplicates).
	const combinedResults = oldResults.concat(
		newResults.filter(
			(newResult) => !oldResults.some((oldResult) => oldResult.url === newResult.url)
		)
	);

	// Make all ranks consecutive.
	// Starting from the appended results, because the old results already have consecutive ranks.
	for (let i = lastRank; i < combinedResults.length; i++) {
		combinedResults[i].rank = i + 1;
	}

	return combinedResults;
}
