<script lang="ts">
	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let result: ResultType;

	// variables
	const loading = result.Rank > 10 ? 'lazy' : 'eager';
</script>

<article id="result-{result.Rank}">
	<a href={result.ImageResult.SourceURL}>
		<div class="overflow-hidden">
			<div class="overflow-hidden rounded-lg">
				<img
					id="img-{result.Rank}"
					class="h-auto w-full transform hover:scale-110 transition duration-300 ease-in-out"
					src={result.ImageResult.ThumbnailURL}
					height={result.ImageResult.Thumbnail.Height}
					width={result.ImageResult.Thumbnail.Width}
					alt={result.Title}
					{loading}
				/>
			</div>
			<h2 class="pt-2 text-sm text-zinc-600 dark:text-zinc-200">
				{result.ImageResult.Source}
			</h2>
			<h1 class="dark:text-white hover:text-zinc-500 dark:hover:text-zinc-300">
				{result.Title}
			</h1>
		</div>
	</a>
</article>
