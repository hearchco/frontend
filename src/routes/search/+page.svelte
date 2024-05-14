<script>
	import Header from '$lib/components/header/main.svelte';
	import Stats from '$lib/components/header/stats.svelte';
	import Zero from '$lib/components/results/zero/main.svelte';
	import General from '$lib/components/results/general/main.svelte';
	import Images from '$lib/components/results/images/main.svelte';
	import { CategoryEnum, toDisplayCategory } from '$lib/types/search/category.js';

	let { data } = $props();

	const javascript = $derived(data.browser);

	const originalQuery = $derived(data.query);
	let query = $state(data.query);
	const title = $derived(
		query === ''
			? 'Hearchco Search'
			: query.length <= 15
				? `${query} | Hearchco Search`
				: `${query.slice(0, 15)}... | Hearchco Search`
	);

	const currentPage = $derived(data.currentPage);
	// const maxPages = $derived(data.maxPages);
	const category = $derived(data.category);
	const results = $derived(data.results);
	const timingRender = $derived(data.timing.render.end - data.timing.render.start);
	const timingApi = $derived(data.timing.api.end - data.timing.api.start);

	/** @type {ResultType | undefined} */
	let imagePreview = $state(undefined);

	/** @type {import('./$types').Snapshot<ResultType | undefined>} */
	export const snapshot = {
		capture: () => imagePreview,
		restore: (value) => (imagePreview = value)
	};
</script>

<svelte:head><title>{title}</title></svelte:head>

<Header bind:query {category} />
{#if results.length !== 0}
	<Stats numOfResults={results.length} {timingRender} {timingApi} />
{/if}

{#if results.length === 0}
	<Zero />
{:else if toDisplayCategory(category) === CategoryEnum.IMAGES}
	<Images {javascript} query={originalQuery} {category} {currentPage} {results} bind:imagePreview />
{:else}
	<General {javascript} query={originalQuery} {category} {currentPage} {results} />
{/if}
