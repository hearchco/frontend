<script lang="ts">
	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let result: ResultType;
</script>

<div id="image-preview-{result.Rank}" class="px-4 pt-4 pb-10 w-full lg:sticky lg:top-0">
	<a href={result.URL}>
		<img
			id="link-{result.Rank}"
			src={result.ImageResult.ThumbnailURL}
			alt={result.Title}
			class="mx-auto h-[50vh] w-auto hover:ring-2 hover:ring-hearchco-primary object-cover transform transition duration-200 ease-in-out"
		/>
	</a>
	<a href={result.ImageResult.SourceURL}>
		<h1 id="title-{result.Rank}" class="pt-5 text-hearchco-primary text-xl hover:underline">
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
