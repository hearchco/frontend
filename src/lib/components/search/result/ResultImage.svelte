<script lang="ts">
	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let result: ResultType;
	export let imgResultPreview: ResultType;

	// variables
	const loading = result.Rank > 10 ? 'lazy' : 'eager';
</script>

<article id="result-{result.Rank}">
	<button
		class="h-full w-full overflow-hidden rounded-lg"
		on:click={() => (imgResultPreview = result)}
	>
		<img
			id="img-{result.Rank}"
			class="h-48 w-auto object-cover transform hover:scale-110 transition duration-300 ease-in-out"
			src={result.ImageResult.ThumbnailURL}
			alt={result.Title}
			{loading}
		/>
	</button>
</article>
