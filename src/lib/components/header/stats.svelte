<script>
	/**
	 * @typedef {object} Props
	 * @property {number} numOfResults
	 * @property {number} timing
	 */

	/** @type {Props} */
	let { numOfResults, timing } = $props();
	const timingString = $derived((timing / 1000).toFixed(2));
</script>

<div id="stats" class="mx-auto px-2 pt-2 max-w-screen-sm">
	<p class="text-sm text-neutral-800 dark:text-neutral-400">
		Hearched {numOfResults} results in {timingString}s 🐹
	</p>
</div>
