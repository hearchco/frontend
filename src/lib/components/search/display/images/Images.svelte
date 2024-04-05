<script lang="ts">
	// components
	import Image from '$lib/components/search/display/images/Image.svelte';
	import Preview from '$lib/components/search/display/images/Preview.svelte';
	import ShowMore from '$lib/components/search/display/images/ShowMore.svelte';

	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let query: string;
	export let currentPage: number;
	export let results: ResultType[];
	export let paramsString: string;

	// variables
	export let imgResultPreview: ResultType | undefined;

	// helper function
	function closeIt(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			imgResultPreview = undefined;
		}
	}
</script>

<div class="w-full lg:flex px-4 py-8">
	<!-- preview on top when screen width < lg -->
	{#if imgResultPreview !== undefined}
		<div id="image-preview" class="lg:hidden mb-9 border-b-2 border-gray-100 dark:border-zinc-700">
			<Preview result={imgResultPreview} bind:imgResultPreview />
		</div>
	{/if}
	<div class="w-full">
		<section
			id="images"
			class="grid sm:grid-cols-fit grid-cols-sm-fit sm:auto-rows-[168px] auto-rows-[28dvw] grid-flow-dense gap-2"
		>
			{#each results as result (result.url)}
				<div
					class:row-span-2={(result.image_result.thumbnail.height * 0.8) /
						result.image_result.thumbnail.width >
						1}
					class:sm:col-span-2={result.image_result.thumbnail.height /
						(result.image_result.thumbnail.width * 0.64) <
						1}
					class="flex-none"
				>
					<Image {result} bind:imgResultPreview />
				</div>
			{/each}
		</section>
	</div>
	<!-- preview on left when screen width >= lg -->
	{#if imgResultPreview !== undefined}
		<div id="image-preview" class="hidden lg:block w-1/2">
			<Preview result={imgResultPreview} bind:imgResultPreview />
		</div>
	{/if}
</div>
<ShowMore bind:query bind:start={currentPage} bind:results bind:paramsString />

<svelte:window on:keydown={closeIt} />
