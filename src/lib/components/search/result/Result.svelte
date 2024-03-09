<script lang="ts">
	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let result: ResultType;
</script>

<article id="result-{result.Rank}">
	<a id="link-{result.Rank}" href={result.URL} class="dark:text-white" rel="noreferrer"
		>{result.URL}</a
	>
	<h1
		id="title-{result.Rank}"
		class="text-hearchco-primary dark:text-hearchco-secondary text-xl hover:underline"
	>
		<a href={result.URL} rel="noreferrer">{result.Title}</a>
	</h1>
	<p
		id="description-{result.Rank}"
		class="my-1 text-justify text-sm text-gray-600 dark:text-gray-200"
	>
		{result.Description}
	</p>
	<div id="engines-{result.Rank}" class="my-2 text-right text-xs text-gray-800 dark:text-gray-400">
		{#each result.EngineRanks as engineRank (engineRank.SearchEngine)}
			<span class="mx-0.5">{engineRank.SearchEngine}</span>
		{/each}
	</div>
</article>
