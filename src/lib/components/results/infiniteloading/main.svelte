<script>
	import { concatSearchParams } from '$lib/functions/api/concatparams';
	import { fetchAdditionalResults } from '$lib/functions/api/additionalresults';
	import { fetchResults } from '$lib/functions/api/fetchresults';

	/**
	 * @typedef {object} Props
	 * @property {string} query
	 * @property {string} category
	 * @property {number} currentPage
	 * @property {ResultType[]} results
	 */

	/** @type {Props} */
	let { query, category, currentPage, results = $bindable() } = $props();

	let nextPage = $state(currentPage + 1);
	/** @param {SubmitEvent} event */
	async function handleSubmit(event) {
		event.preventDefault();
		const params = concatSearchParams([
			['q', query],
			['category', category],
			['start', nextPage.toString()]
		]);
		const newResults = await fetchAdditionalResults(results, params);
		results = newResults;
		nextPage = nextPage + 1;
	}

	async function preloadResults() {
		const params = concatSearchParams([
			['q', query],
			['category', category],
			['start', nextPage.toString()]
		]);
		await fetchResults(params);
	}
</script>

<form
	class="px-5 pb-12 flex place-content-center"
	method="get"
	action="/search"
	onsubmit={handleSubmit}
>
	<input type="hidden" name="q" value={query} />
	<input type="hidden" name="category" value={category} />
	<input type="hidden" name="start" value={nextPage} />
	<button
		onmouseover={preloadResults}
		onfocus={preloadResults}
		type="submit"
		class="h-12 w-full 2xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[300px] text-neutral-600 dark:text-neutral-300 hover:text-hearchco-primary hover:dark:text-hearchco-secondary shadow-lg dark:shadow-none rounded-lg hover:bg-neutral-100 hover:dark:bg-neutral-800 border-2 hover:border-hearchco-primary hover:dark:border-hearchco-secondary duration-150 ease-in-out"
	>
		Load more results
	</button>
</form>
