<script lang="ts">
	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let result: ResultType;
</script>

<article id="result-{result.rank}">
	<a id="link-{result.rank}" href={result.url} class="dark:text-white" rel="noreferrer"
		>{result.url}</a
	>
	<h1
		id="title-{result.rank}"
		class="text-hearchco-primary dark:text-hearchco-secondary text-xl hover:underline"
	>
		<a href={result.url} rel="noreferrer">{result.title}</a>
	</h1>
	<p
		id="description-{result.rank}"
		class="my-1 text-justify text-sm text-gray-600 dark:text-gray-200 line-clamp-6 hover:line-clamp-none"
	>
		{result.description}
	</p>
	<div id="engines-{result.rank}" class="my-2 text-right text-xs text-gray-800 dark:text-gray-400">
		{#each result.engine_ranks as engineRank (engineRank.search_engine)}
			<span class="mx-0.5">{engineRank.search_engine}</span>
		{/each}
	</div>
</article>
