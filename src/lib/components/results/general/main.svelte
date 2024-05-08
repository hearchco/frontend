<script>
	import Single from './single.svelte';
	import Paginator from '../paginator/main.svelte';
	import InfiniteLoading from '../infiniteloading/main.svelte';

	/**
	 * @typedef {object} Props
	 * @property {boolean} javascript
	 * @property {string} query
	 * @property {string} category
	 * @property {number} currentPage
	 * @property {ResultType[]} results
	 */

	/** @type {Props} */
	let { javascript, query = $bindable(), category, currentPage, results } = $props();
</script>

<div class="mx-auto pb-4 max-w-screen-sm">
	<section id="results" class="px-2 py-4 max-w-fit overflow-clip">
		{#each results as result, i (result.url)}
			<Single {result} />
			{#if i !== results.length - 1}
				<hr class="my-2 border border-neutral-200 dark:border-neutral-600" />
			{/if}
		{/each}
	</section>
</div>

{#if !javascript}
	<Paginator bind:query {category} {currentPage} />
{:else}
	<InfiniteLoading bind:query {category} {currentPage} bind:results />
{/if}
