<script>
	import { proxyImageLink } from '$lib/functions/api/proxyimage';

	/**
	 * @typedef {object} Props
	 * @property {ResultType} result
	 * @property {ResultType | undefined} imagePreview
	 */

	/** @type {Props} */
	// eslint-disable-next-line no-unused-vars
	let { result, imagePreview = $bindable() } = $props();
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Escape') {
			imagePreview = undefined;
		}
	}}
/>

<div id="image-preview-{result.rank}" class="px-4 lg:pr-0 pb-4 w-full lg:top-0 lg:sticky">
	<div class="py-4 w-full flex justify-between items-start">
		<a href={result.source_url}>
			<h1
				id="title-{result.rank}"
				class="text-xl text-hearchco-primary dark:text-hearchco-secondary hover:underline"
			>
				{result.title}
			</h1>
		</a>
		<button
			type="button"
			class="ml-1 max-5xs:hidden text-neutral-500 hover:text-hearchco-primary hover:dark:text-hearchco-secondary duration-100 ease-in-out"
			onclick={() => (imagePreview = undefined)}
		>
			<svg class="size-8" viewBox="0 0 512 512" aria-hidden="true">
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
					d="M368 368L144 144M368 144L144 368"
				></path>
			</svg>
		</button>
	</div>
	<a href={result.url}>
		<img
			id="link-{result.rank}"
			src={proxyImageLink(result.thumbnail_url, result.thumbnail_url_hash)}
			alt={result.title}
			class="max-h-[40dvh] w-full object-contain bg-neutral-100 dark:bg-neutral-800 rounded-lg"
		/>
	</a>
	<p
		id="description-{result.rank}"
		class="pt-4 text-justify text-sm text-neutral-600 dark:text-neutral-200"
	>
		{#if result.description === ''}
			no description found
		{:else}
			{result.description}
		{/if}
	</p>

	<div
		id="engines-{result.rank}"
		class="pt-2 text-right text-xs text-neutral-800 dark:text-neutral-400"
	>
		{#each result.engine_ranks as engineRank (engineRank.search_engine)}
			<span class="mx-0.5">{engineRank.search_engine}</span>
		{/each}
	</div>
</div>
