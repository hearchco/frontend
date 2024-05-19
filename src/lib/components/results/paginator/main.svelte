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

	/**
	 * @param {number} index
	 * @returns {number}
	 */
	function calcPageNum(index) {
		return index + offset + 1;
	}

	/**
	 * @param {number} index
	 * @returns {boolean}
	 */
	function selected(index) {
		return currentPage === calcPageNum(index);
	}
</script>

<form class="pb-5 flex flex-row justify-center" method="get" action="/search">
	<input type="hidden" name="q" value={query} />
	<input type="hidden" name="category" value={category} />
	<!-- eslint-disable-next-line no-unused-vars -->
	{#each { length: numberOfPages } as _, i}
		<Number page={calcPageNum(i)} selected={selected(i)} />
	{/each}
</form>
