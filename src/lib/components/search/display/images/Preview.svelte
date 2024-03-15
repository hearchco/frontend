<script lang="ts">
	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let result: ResultType;
</script>

<div id="image-preview-{result.Rank}" class="px-4 pt-4 pb-10 w-full lg:sticky lg:top-0">
	<a href={result.URL}>
		<div
			class="h-[50dvh] flex justify-center mx-auto hover:ring-2 hover:ring-hearchco-primary hover:dark:ring-hearchco-secondary overflow-hidden rounded-lg"
		>
			<img
				id="link-{result.Rank}"
				src={result.ImageResult.ThumbnailURL}
				alt={result.Title}
				class="h-full w-full object-contain transform transition duration-200 ease-in-out"
			/>
		</div>
	</a>
	<a href={result.ImageResult.SourceURL}>
		<h1
			id="title-{result.Rank}"
			class="pt-5 text-hearchco-primary dark:text-hearchco-secondary text-xl hover:underline"
		>
			{result.Title}
		</h1>
	</a>
	<p id="description-{result.Rank}" class="text-justify text-sm text-gray-600 dark:text-gray-200">
		{result.Description}
	</p>
	<div id="engines-{result.Rank}" class="pt-2 text-right text-xs text-gray-800 dark:text-gray-400">
		{#each result.EngineRanks as engineRank (engineRank.SearchEngine)}
			<span class="mx-0.5">{engineRank.SearchEngine}</span>
		{/each}
	</div>
</div>
