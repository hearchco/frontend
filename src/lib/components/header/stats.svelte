<script>
	/**
	 * @typedef {object} Props
	 * @property {number} numOfResults
	 * @property {TimingType} timing
	 */

	/** @type {Props} */
	let { numOfResults, timing } = $props();
	const timingFetchString = $derived((timing.fetch / 1000).toFixed(2));
	const timingScrapeString = $derived((timing.scrape / 1000).toFixed(2));
</script>

<div id="stats" class="mx-auto px-2 pt-2 max-w-screen-sm">
	<p class="text-sm text-neutral-800 dark:text-neutral-400">
		Hearched {numOfResults} results in {timingFetchString}s (scraped in {timingScrapeString}s) 🐹
	</p>
</div>
