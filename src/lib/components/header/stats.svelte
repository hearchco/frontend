<script>
	/**
	 * @typedef {object} Props
	 * @property {number} numOfResults
	 * @property {number} timingRender
	 * @property {number} timingApi
	 */

	/** @type {Props} */
	let { numOfResults, timingRender, timingApi } = $props();
	const timingRenderString = $derived((timingRender / 1000).toFixed(2));
	const timingApiString = $derived((timingApi / 1000).toFixed(2));
</script>

<div id="stats" class="mx-auto px-2 pt-2 max-w-screen-sm">
	<p class="text-sm text-neutral-800 dark:text-neutral-400">
		Hearched {numOfResults} results in {timingRenderString}s (API took {timingApiString}s) 🐹
	</p>
</div>
