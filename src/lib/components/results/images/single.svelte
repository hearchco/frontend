<script>
	import { proxyImageLink } from '$lib/functions/api/proxyimage';

	/**
	 * @typedef {object} Props
	 * @property {ResultType} result
	 * @property {ResultType | undefined} imagePreview
	 */

	/** @type {Props} */
	let { result, imagePreview = $bindable() } = $props();

	const loading = result.rank > 30 ? 'lazy' : 'eager';

	const selected = $derived(result.url === imagePreview?.url);
	function openImage() {
		if (selected) {
			imagePreview = undefined;
		} else {
			imagePreview = result;
		}
	}
</script>

<article class="size-full" id="image-{result.rank}">
	<button
		class:ring-4={selected}
		class:ring-hearchco-primary={selected}
		class:dark:ring-hearchco-secondary={selected}
		class:hover:ring-hearchco-primary={selected}
		class:hover:dark:ring-hearchco-secondary={selected}
		class:hover:ring-neutral-300={!selected}
		class:hover:dark:ring-neutral-100={!selected}
		class="size-full rounded-lg shadow-sm dark:shadow-none overflow-hidden hover:ring-4 hover:scale-110 relative z-0 hover:z-50 transform delay-75 duration-300 ease-in-out"
		onclick={openImage}
	>
		<img
			id="img-{result.rank}"
			class="size-full object-cover object-center"
			src={proxyImageLink(result.thumbnail_url, result.thumbnail_url_hash)}
			alt={result.title}
			{loading}
		/>
	</button>
</article>
