<script lang="ts">
	// components
	import Result from '$lib/components/search/result/Result.svelte';
	import ResultImage from '$lib/components/search/result/ResultImage.svelte';
	import ResultImagePreview from '$lib/components/search/result/ResultImagePreview.svelte';
	import Error from '$lib/components/Error.svelte';

	// functions
	import { categoryFrom } from '$lib/functions/categoryFrom';

	// types
	import type { ResultType } from '$lib/types/result';
	import { CategoryEnum } from '$lib/types/category';

	// parameters
	export let query;
	export let results: ResultType[];

	let imgResultPreview: ResultType | undefined = results[0];

	// variables
	const category = categoryFrom(query);
</script>

<!-- todo: await deep results and offer button to switch to them -->
{#if category === CategoryEnum.IMAGES}
	<div class="w-full lg:flex px-4 py-8">
		{#if imgResultPreview !== undefined}
			<div id="image-preview" class="lg:hidden">
				<ResultImagePreview result={imgResultPreview} />
			</div>
		{/if}
		<section
			id="images"
			class:tw-w-2-3={imgResultPreview !== undefined}
			class="flex flex-wrap justify-center gap-2"
		>
			{#each results as result (result.URL)}
				<div class="flex-none">
					<ResultImage {result} bind:imgResultPreview />
				</div>
			{/each}
		</section>
		{#if imgResultPreview !== undefined}
			<div id="image-preview" class="hidden lg:block w-1/3">
				<ResultImagePreview result={imgResultPreview} />
			</div>
		{/if}
	</div>
{:else if category !== undefined}
	<div class="sm:mx-auto mb-4 max-w-screen-sm">
		<section id="results" class="mx-2 my-4 max-w-fit overflow-clip">
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

<style>
	@media (min-width: 1024px) {
		.tw-w-2-3 {
			@apply w-2/3;
		}
	}
</style>
