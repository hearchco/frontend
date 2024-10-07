<script>
	import { toCurrencyName } from '$lib/functions/gadgets/exchange';

	/**
	 * @typedef {object} Props
	 * @property {string} from
	 * @property {string} to
	 * @property {number} amount
	 * @property {Map<string,number>} currencies
	 */

	/** @type {Props} */
	let { from, to, amount, currencies } = $props();

	// Create an array of currency names from currency map.
	const currenciesNames = Array.from(currencies.keys());

	const result = $derived.by(() => {
		const fromValue = currencies.get(from);
		const toValue = currencies.get(to);

		if (!fromValue || !toValue) {
			throw new Error('Invalid currency');
		}

		return (amount / fromValue) * toValue;
	});

	/**
	 * Swaps FROM and TO currencies.
	 * @returns {void}
	 */
	function handleSwap() {
		const temp = from;
		from = to;
		to = temp;
	}
</script>

<div class="mx-auto my-2 max-w-screen-sm">
	<div
		class="mx-2 py-12 bg-neutral-100 dark:bg-neutral-800 border dark:border-neutral-700 rounded-lg"
	>
		<div class="w-full flex flex-col items-center space-y-4">
			<div class="w-2/3 flex items-center">
				<input
					type="number"
					bind:value={amount}
					class="w-5/12 p-2 bg-white dark:bg-neutral-700 border dark:border-neutral-600 rounded"
					min={0}
				/>
				<div class="w-2/12"></div>
				<input
					type="number"
					value={result.toFixed(2) !== '0.00' ? result.toFixed(2) : result}
					class="w-5/12 p-2 bg-white dark:bg-neutral-700 border dark:border-neutral-600 rounded"
					readOnly
				/>
			</div>
			<div class="w-2/3 flex items-center">
				<select
					bind:value={from}
					class="w-5/12 p-2 bg-white dark:bg-neutral-700 border dark:border-neutral-600 rounded"
				>
					{#each currenciesNames as currency}
						<option value={currency}>{toCurrencyName(currency) ?? currency}</option>
					{/each}
				</select>
				<div class="w-2/12 flex justify-center items-center">
					<button
						aria-label="Swap currencies"
						onclick={handleSwap}
						class="size-6 text-neutral-800 dark:text-neutral-200"
					>
						<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M33.5,23.6a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3L35.2,31H8a2,2,0,0,0,0,4H35.2l-4.6,4.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2l7.9-8a1.9,1.9,0,0,0,0-2.8Z"
								fill="currentColor"
							/>
							<path
								d="M14.5,24.4a2.1,2.1,0,0,0,2.7.2,1.9,1.9,0,0,0,.2-3L12.8,17H40a2,2,0,0,0,0-4H12.8l4.6-4.6a1.9,1.9,0,0,0-.2-3,2.1,2.1,0,0,0-2.7.2l-7.9,8a1.9,1.9,0,0,0,0,2.8Z"
								fill="currentColor"
							/>
						</svg>
					</button>
				</div>
				<select
					bind:value={to}
					class="w-5/12 p-2 bg-white dark:bg-neutral-700 border dark:border-neutral-600 rounded"
				>
					{#each currenciesNames as currency}
						<option value={currency}>{toCurrencyName(currency) ?? currency}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
</div>
