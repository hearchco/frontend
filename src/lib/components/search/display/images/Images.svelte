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
	<div class="w-full">
		<section id="images" class="grid grid-cols-fit auto-rows-[200px] grid-flow-dense gap-2">
			{#each results as result (result.URL)}
				<div
					class:row-span-2={(result.ImageResult.Original.Width * 0.8) /
						result.ImageResult.Original.Height >
						1}
					class:sm:col-span-2={result.ImageResult.Original.Width /
						(result.ImageResult.Original.Height * 0.64) <
						1}
					class="flex-none"
				>
					<Image {result} bind:imgResultPreview />
				</div>
			{/each}
		</section>
	</div>
	{#if imgResultPreview !== undefined}
		<div id="image-preview" class="hidden lg:block w-1/2">
			<Preview result={imgResultPreview} />
		</div>
	{/if}
</div>
<ShowMore bind:query bind:maxPages />
