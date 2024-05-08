<script>
	/**
	 * @typedef {object} Props
	 * @property {ResultType} result
	 */

	/** @type {Props} */
	let { result } = $props();
</script>

<article id="result-{result.rank}">
	<a id="link-{result.rank}" href={result.url} rel="noreferrer">
		{result.url}
	</a>
	<h1
		id="title-{result.rank}"
		class="text-xl text-hearchco-primary dark:text-hearchco-secondary hover:underline"
	>
		<a href={result.url} rel="noreferrer">{result.title}</a>
	</h1>
	<p
		id="description-{result.rank}"
		class="my-1 text-justify text-sm text-neutral-600 dark:text-neutral-200 line-clamp-6 hover:line-clamp-none"
	>
		{result.description}
	</p>
	<div
		id="engines-{result.rank}"
		class="my-2 text-right text-xs text-neutral-800 dark:text-neutral-400"
	>
		{#each result.engine_ranks as er (er.search_engine)}
			<span class="mx-0.5">{er.search_engine}</span>
		{/each}
	</div>
</article>
