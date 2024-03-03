<script lang="ts">
	// components
	import Error from '$lib/components/Error.svelte';
	import Load from '$lib/components/search/load/Load.svelte';
	import LoadImage from '$lib/components/search/load/LoadImage.svelte';

	// functions
	import { categoryFrom } from '$lib/functions/categoryFrom';

	// types
	import { CategoryEnum } from '$lib/types/category';

	// parameters
	export let query;

	// variables
	const category = categoryFrom(query);
	const numberOfResults = 32;
</script>

{#if category === CategoryEnum.IMAGES}
	<div class="px-4 py-8">
		<section id="images" class="flex flex-wrap justify-center gap-2">
			{#each { length: numberOfResults } as _}
				<div class="flex-none">
					<LoadImage />
				</div>
			{/each}
		</section>
	</div>
{:else if category !== undefined}
	<div class="sm:mx-auto mb-4 max-w-screen-sm">
		<section id="result-list" class="mx-2 my-4 max-w-fit overflow-clip">
			{#each { length: numberOfResults } as _, i}
				<Load />
				{#if i !== numberOfResults - 1}
					<hr class="my-2 border border-gray-200 dark:border-gray-600" />
				{/if}
			{/each}
		</section>
	</div>
{:else}
	<Error statusCode={'500'} message={'Unknown category requested.'} />
{/if}
