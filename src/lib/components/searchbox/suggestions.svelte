<script>
	import { fetchSuggestions } from '$lib/functions/api/fetchsuggestions';

	/**
	 * @typedef {object} Props
	 * @property {string} query
	 */

	/** @type {Props} */
	let { query } = $props();

	/** @type {Promise<SuggestionType[]>} */
	let suggestions = $derived.by(async () => {
		if (query === '') return [];
		const suggs = await fetchSuggestions(query);
		if (suggs.length === 0) console.debug('No suggestions found');
		return suggs;
	});
</script>

{#await suggestions then suggestions}
	{#if suggestions.length > 0}
		<ul
			class="absolute w-full max-w-screen-sm mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10"
		>
			{#each suggestions as suggestion}
				<li class="cursor-pointer px-4 py-2 hover:bg-gray-100">{suggestion.value}</li>
			{/each}
		</ul>
	{/if}
{/await}
