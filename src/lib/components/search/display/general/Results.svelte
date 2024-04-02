<script lang="ts">
	// components
	import Result from '$lib/components/search/display/general/Result.svelte';
	import Pages from '$lib/components/search/display/general/Pages.svelte';

	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let query: string;
	export let currentPage: number;
	export let results: ResultType[];
</script>

<div class="sm:mx-auto mb-4 max-w-screen-sm">
	<section id="results" class="mx-2 my-4 max-w-fit overflow-clip">
		{#each results as result, i (result.url)}
			<Result {result} />
			{#if i !== results.length - 1}
				<hr class="my-2 border border-gray-200 dark:border-gray-600" />
			{/if}
		{/each}
	</section>
</div>
<Pages bind:query bind:currentPage />
