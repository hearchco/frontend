<script lang="ts">
	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let result: ResultType;

	// variables
	const loading = result.Rank > 10 ? 'lazy' : 'eager';
</script>

<article id="result-{result.Rank}">
	<a href={result.URL}>
		<img
			id="img-{result.Rank}"
			class="h-auto w-full border dark:border-black"
			src={result.ImageResult.Thumbnail.URL}
			height={result.ImageResult.Thumbnail.Height}
			width={result.ImageResult.Thumbnail.Width}
			alt={result.Title}
			{loading}
		/>
	</a>
</article>
