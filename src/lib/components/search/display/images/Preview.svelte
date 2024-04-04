<script lang="ts">
	import { proxyImageLink } from '$lib/functions/proxyImageLink';

	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let result: ResultType;
	export let imgResultPreview: ResultType | undefined;
</script>

<div id="image-preview-{result.rank}" class="px-4 pb-4 w-full lg:sticky lg:top-0">
	<div class="w-full flex justify-between items-start pt-4 mb-4">
		<a href={result.image_result.source_url}>
			<h1
				id="title-{result.rank}"
				class="text-hearchco-primary dark:text-hearchco-secondary text-xl hover:underline"
			>
				{result.title}
			</h1>
		</a>
		<button
			type="button"
			class="text-zinc-500 hover:text-hearchco-primary hover:dark:text-hearchco-secondary h-full w-8 ml-0.5 mr-1.5 rounded-full bg-transparent max-[200px]:hidden duration-100 ease-in-out"
			on:click={() => (imgResultPreview = undefined)}
		>
			<svg class="h-[32px] bg-transparent" viewBox="0 0 512 512" aria-hidden="true">
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
	<div class="flex justify-center">
		<a href={result.url}>
			<div
				class="sm:max-w-[50dvw] mx-auto hover:ring-2 hover:ring-hearchco-primary hover:dark:ring-hearchco-secondary overflow-hidden rounded-lg duration-200 ease-in-out"
			>
				<img
					id="link-{result.rank}"
					src={proxyImageLink(result.url, result.url_hash)}
					alt={result.title}
					class="max-h-[50dvh] h-full w-full object-contain transform transition"
				/>
			</div>
		</a>
	</div>
	<p
		id="description-{result.rank}"
		class="pt-4 text-justify text-sm text-gray-600 dark:text-gray-200"
	>
		{#if result.description === ''}
			no description found
		{:else}
			{result.description}
		{/if}
	</p>

	<div id="engines-{result.rank}" class="pt-2 text-right text-xs text-gray-800 dark:text-gray-400">
		{#each result.engine_ranks as engineRank (engineRank.search_engine)}
			<span class="mx-0.5">{engineRank.search_engine}</span>
		{/each}
	</div>
</div>
