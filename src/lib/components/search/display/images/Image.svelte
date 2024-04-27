<script lang="ts">
	import { proxyImageLink } from '$lib/functions/proxyImageLink';

	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let result: ResultType;
	export let imgResultPreview: ResultType | undefined;

	// variables
	const loading: 'eager' | 'lazy' | null | undefined = result.rank > 10 ? 'lazy' : 'eager';
	$: selected = imgResultPreview?.url === result.url;

	// functions
	function openImage() {
		if (selected) {
			imgResultPreview = undefined;
		} else {
			imgResultPreview = result;
		}
	}
</script>

<article class="w-full h-full" id="image-{result.rank}">
	<button
		class:ring-4={selected}
		class:ring-hearchco-primary={selected}
		class:dark:ring-hearchco-secondary={selected}
		class="w-full h-full overflow-hidden hover:scale-110 relative z-0 hover:z-50 hover:ring-4 hover:ring-gray-300 hover:dark:ring-gray-100 transform delay-75 duration-300 ease-in-out rounded-lg shadow-sm dark:shadow-none"
		on:click={() => openImage()}
	>
		<img
			id="img-{result.rank}"
			class="w-full h-full object-cover object-center"
			src={proxyImageLink(
				result.image_result.thumbnail_url,
				result.image_result.thumbnail_url_hash
			)}
			alt={result.title}
			{loading}
		/>
	</button>
</article>
