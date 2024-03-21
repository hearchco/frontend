<script lang="ts">
	import { proxyImageLink } from '$lib/functions/proxyImageLink';

	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let result: ResultType;
	export let imgResultPreview: ResultType | undefined;

	// variables
	const loading: 'eager' | 'lazy' | null | undefined = result.Rank > 10 ? 'lazy' : 'eager';
	$: selected = imgResultPreview === result;

	// functions
	function openImage() {
		if (selected) {
			imgResultPreview = undefined;
		} else {
			imgResultPreview = result;
		}
	}
</script>

<article class="w-full h-full" id="image-{result.Rank}">
	<button
		class:ring-4={selected}
		class:ring-hearchco-primary={selected}
		class:dark:ring-hearchco-secondary={selected}
		class="w-full h-full overflow-hidden rounded-lg shadow-sm dark:shadow-none"
		on:click={() => openImage()}
	>
		<img
			id="img-{result.Rank}"
			class="w-full h-full object-cover object-center transform hover:scale-110 transition duration-300 ease-in-out"
			src={proxyImageLink(result.ImageResult.ThumbnailURL, result.ImageResult.ThumbnailURLHash)}
			alt={result.Title}
			{loading}
		/>
	</button>
</article>
