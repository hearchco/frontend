<script lang="ts">
	import type { Result } from './ResultType';
	export let result: Result;
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
			loading="lazy"
		/>
	</a>
</article>
