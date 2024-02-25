<script lang="ts">
	// components
	import Result from '$lib/components/search/result/Result.svelte';
	import ResultImage from '$lib/components/search/result/ResultImage.svelte';
	import Error from '$lib/components/Error.svelte';

	// functions
	import { categoryFrom } from '$lib/functions/categoryFrom';

	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let query;
	export let results: ResultType[];

	let imgResultPreview: ResultType;

	// variables
	const category = categoryFrom(query);
</script>

<!-- todo: await deep results and offer button to switch to them -->
{#if category === 'GENERAL'}
	<div class="sm:mx-auto mb-4 max-w-screen-sm">
		<section id="result-list" class="mx-2 my-4 max-w-fit overflow-clip">
			{#each results as result (result.URL)}
				<Result {result} />
				<hr class="my-2 border border-gray-200 dark:border-gray-600" />
			{/each}
		</section>
	</div>
{:else if category === 'IMAGE'}
	{#if imgResultPreview}
		<p>{imgResultPreview.Title}</p>
	{/if}
	<div class="px-4 py-8">
		<section
			id="images"
			class="gap-0 columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-8"
		>
			{#each results as result (result.URL)}
				<div class="px-2 py-2">
					<ResultImage {result} bind:imgResultPreview />
				</div>
			{/each}
		</section>
	</div>
{:else}
	<Error statusCode={'500'} message={'Unknown category requested.'} />
{/if}
