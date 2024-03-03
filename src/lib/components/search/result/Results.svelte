<script lang="ts">
	// components
	import Result from '$lib/components/search/result/Result.svelte';
	import ResultImage from '$lib/components/search/result/ResultImage.svelte';
	import Error from '$lib/components/Error.svelte';

	// functions
	import { categoryFrom } from '$lib/functions/categoryFrom';

	// types
	import type { ResultType } from '$lib/types/result';
	import { CategoryEnum } from '$lib/types/category';

	// parameters
	export let query;
	export let results: ResultType[];

	let imgResultPreview: ResultType;

	// variables
	const category = categoryFrom(query);
</script>

<!-- todo: await deep results and offer button to switch to them -->
{#if category === CategoryEnum.IMAGES}
	{#if imgResultPreview}
		<!-- todo: actual preview of image -->
		<p>{imgResultPreview.Title}</p>
	{/if}
	<div class="px-4 py-8">
		<section id="images" class="flex flex-wrap justify-center gap-2">
			{#each results as result (result.URL)}
				<div class="flex-none">
					<ResultImage {result} bind:imgResultPreview />
				</div>
			{/each}
		</section>
	</div>
{:else if category !== undefined}
	<div class="sm:mx-auto mb-4 max-w-screen-sm">
		<section id="result-list" class="mx-2 my-4 max-w-fit overflow-clip">
			{#each results as result, i (result.URL)}
				<Result {result} />
				{#if i !== results.length - 1}
					<hr class="my-2 border border-gray-200 dark:border-gray-600" />
				{/if}
			{/each}
		</section>
	</div>
{:else}
	<Error statusCode={'500'} message={'Unknown category requested.'} />
{/if}
