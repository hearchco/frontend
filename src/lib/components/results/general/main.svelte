<script>
	import Single from './single.svelte';
	import Paginator from '../paginator/main.svelte';
	import InfiniteLoading from '../infiniteloading/main.svelte';

	/**
	 * @typedef {object} Props
	 * @property {boolean} browser
	 * @property {string} query
	 * @property {string} category
	 * @property {number} currentPage
	 * @property {ResultType[]} results
	 */

	/** @type {Props} */
	let { browser, query, category, currentPage, results } = $props();
</script>

<div class="mx-auto pb-4 max-w-screen-sm">
	<section
		id="results"
		class="px-2 py-4 max-w-fit divide-y-2 divide-neutral-200 dark:divide-neutral-600"
	>
		{#each results as result (result.url)}
			<Single {result} />
		{/each}
	</section>
</div>

{#if !browser}
	<Paginator {query} {category} {currentPage} />
{:else}
	<InfiniteLoading {query} {category} {currentPage} bind:results />
{/if}
