<script lang="ts">
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

<article id="image-{result.Rank}">
	<button
		class:ring-4={selected}
		class:ring-hearchco-primary={selected}
		class="h-full w-full overflow-hidden rounded-lg shadow-sm dark:shadow-none"
		on:click={() => openImage()}
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
