<script lang="ts">
	// components
	import Image from '$lib/components/search/display/images/Image.svelte';
	import Preview from '$lib/components/search/display/images/Preview.svelte';
	import ShowMore from '$lib/components/search/display/images/ShowMore.svelte';

	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let query: string;
	export let maxPages: number;
	export let results: ResultType[];

	// variables
	let imgResultPreview: ResultType | undefined;
</script>

<div class="w-full lg:flex px-4 py-8">
	{#if imgResultPreview !== undefined}
		<div id="image-preview" class="lg:hidden">
			<Preview result={imgResultPreview} />
		</div>
	{/if}
	<section
		id="images"
		class:tw-w-2-3={imgResultPreview !== undefined}
		class="flex flex-wrap justify-center gap-2"
	>
		{#each results as result (result.URL)}
			<div class="flex-none">
				<Image {result} bind:imgResultPreview />
			</div>
		{/each}
	</section>
	{#if imgResultPreview !== undefined}
		<div id="image-preview" class="hidden lg:block w-1/3">
			<Preview result={imgResultPreview} />
		</div>
	{/if}
</div>
<ShowMore bind:query bind:maxPages />

<style>
	/* equivalent to tailwindcss lg:w-2/3 */
	/* needed for class:<class>=<boolean> */
	@media (min-width: 1024px) {
		.tw-w-2-3 {
			width: 66.666667%;
		}
	}
</style>
