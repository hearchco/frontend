<script lang="ts">
	// components
	import LoadResult from '$lib/components/search/load/general/LoadResult.svelte';

	// variables
	const numberOfResults: number = 32;
</script>

<div class="sm:mx-auto mb-4 max-w-screen-sm">
	<section id="results" class="mx-2 my-4">
		{#each { length: numberOfResults } as _, i}
			<LoadResult />
			{#if i !== numberOfResults - 1}
				<hr class="my-2 border border-gray-200 dark:border-gray-600" />
			{/if}
		{/each}
	</section>
</div>
