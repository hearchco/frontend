<script>
	import Number from './number.svelte';

	/**
	 * @typedef {object} Props
	 * @property {string} query
	 * @property {string} category
	 * @property {number} currentPage
	 */

	/** @type {Props} */
	let { query, category, currentPage } = $props();

	const numberOfPages = 5;
	const offset = $derived(currentPage > 3 ? currentPage - 3 : 0);
</script>

<form class="pb-5 flex flex-row justify-center" method="get" action="/search">
	<input type="hidden" name="q" value={query} />
	<input type="hidden" name="category" value={category} />
	<!-- eslint-disable-next-line no-unused-vars -->
	{#each { length: numberOfPages } as _, i}
		{@const page = i + offset + 1}
		{@const selected = currentPage === page}
		<Number {page} {selected} />
	{/each}
</form>
