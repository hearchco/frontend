<script>
	import { exchange } from '$lib/functions/gadgets/exchange';
	import { extractExchangeQuery } from '$lib/functions/query/gadgets/exchange';

	/**
	 * @typedef {object} Props
	 * @property {string} query
	 */

	/** @type {Props} */
	let { query } = $props();

	const { from, to, amount } = extractExchangeQuery(query);
	const result = exchange(from, to, amount);
</script>

<div class="mx-auto px-2 pt-4 max-w-screen-sm">
	{#await result then result}
		<span class="text-xl">
			{amount.toFixed(2)}
			<b>{from.toUpperCase()}</b> equals {result.toFixed(2)}
			<b>{to.toUpperCase()}</b>.
		</span>
	{/await}
</div>
