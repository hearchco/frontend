<script>
	/**
	 * @typedef {object} Props
	 * @property {number} numOfResults
	 * @property {number} duration
	 */

	/** @type {Props} */
	let { numOfResults, duration } = $props();
	const durationString = $derived((duration / 1000).toFixed(2));
</script>

<div id="stats" class="mx-auto px-2 pt-2 max-w-screen-sm">
	<p class="text-sm text-neutral-800 dark:text-neutral-400">
		Hearched {numOfResults} results in {durationString}s 🐹
	</p>
</div>
