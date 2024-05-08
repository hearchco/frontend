<script>
	import Single from './single.svelte';
	import Preview from './preview.svelte';
	import Paginator from '../paginator/main.svelte';
	import InfiniteLoading from '../infiniteloading/main.svelte';

	/**
	 * @typedef {object} Props
	 * @property {boolean} javascript
	 * @property {string} query
	 * @property {string} category
	 * @property {number} currentPage
	 * @property {ResultType[]} results
	 * @property {ResultType | undefined} imagePreview
	 */

	/** @type {Props} */
	let {
		javascript,
		query = $bindable(),
		category,
		currentPage,
		results,
		imagePreview = $bindable()
	} = $props();
</script>

<div class="px-4 py-8 w-full lg:flex">
	<!-- preview on top when screen width <lg -->
	{#if imagePreview}
		<div
			id="image-preview-sm"
			class="lg:hidden mb-9 border-b-2 border-neutral-100 dark:border-neutral-700"
		>
			<Preview result={imagePreview} bind:imagePreview />
		</div>
	{/if}
	<div class="w-full">
		<section
			id="images"
			class="grid grid-flow-dense grid-cols-sm-fit sm:grid-cols-fit auto-rows-[28dvw] sm:auto-rows-[168px] gap-2"
		>
			{#each results as result (result.url)}
				<div
					class:row-span-2={(result.image_result.thumbnail.height * 0.8) /
						result.image_result.thumbnail.width >
						1}
					class:col-span-2={result.image_result.thumbnail.height /
						(result.image_result.thumbnail.width * 0.64) <
						1}
					class="flex-none"
				>
					<Single {result} bind:imagePreview />
				</div>
			{/each}
		</section>
	</div>
	<!-- preview on right when screen width >=lg -->
	{#if imagePreview}
		<div id="image-preview-lg" class="hidden lg:block w-1/2">
			<Preview result={imagePreview} bind:imagePreview />
		</div>
	{/if}
</div>

{#if !javascript}
	<Paginator bind:query {category} {currentPage} />
{:else}
	<InfiniteLoading bind:query {category} {currentPage} bind:results />
{/if}
