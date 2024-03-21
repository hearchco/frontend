<script lang="ts">
	import { proxyImageLink } from '$lib/functions/proxyImageLink';
	import { sleep } from '$lib/functions/sleep';

	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let result: ResultType;
	export let imgResultPreview: ResultType | undefined;
	export let imgResultPreviewLoaded: boolean;
	export let imgResultPreviewLoading: Promise<void>;

	// variables
	const loading: 'eager' | 'lazy' | null | undefined = result.Rank > 10 ? 'lazy' : 'eager';
	$: selected = imgResultPreview === result;
	let loaded: boolean = false;

	// functions
	function openImage() {
		imgResultPreviewLoaded = false;
		imgResultPreviewLoading = sleep(250);
		if (selected) {
			imgResultPreview = undefined;
		} else {
			imgResultPreview = result;
		}
	}
</script>

<article class="w-full h-full" id="image-{result.Rank}">
	<button
		on:click={() => openImage()}
		class:ring-4={selected}
		class:ring-hearchco-primary={selected}
		class:dark:ring-hearchco-secondary={selected}
		class:opacity-1={loaded}
		class:opacity-0={!loaded}
		class="w-full h-full overflow-hidden rounded-lg shadow-sm dark:shadow-none transition-opacity duration-700 ease-in-out"
	>
		<img
			on:load={() => (loaded = true)}
			id="img-{result.Rank}"
			class="w-full h-full object-cover object-center transform hover:scale-110 transition duration-300 ease-in-out"
			src={proxyImageLink(result.ImageResult.ThumbnailURL, result.ImageResult.ThumbnailURLHash)}
			alt={result.Title}
			{loading}
		/>
	</button>
</article>
