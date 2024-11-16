<script>
	// Header
	import Header from '$lib/components/header/main.svelte';
	import Stats from '$lib/components/header/stats.svelte';

	// Gadgets
	import Exchange from '$lib/components/gadgets/exchange/main.svelte';
	import Timer from '$lib/components/gadgets/timer/main.svelte';
	import { timery } from '$lib/functions/query/gadgets/timer.js';

	// Results
	import Zero from '$lib/components/results/zero/main.svelte';
	import General from '$lib/components/results/general/main.svelte';
	import Images from '$lib/components/results/images/main.svelte';
	import { assertImagesResultType } from '$lib/types/search/assert.js';

	let { data } = $props();

	const browser = $derived(data.browser);
	const query = $derived(data.query);
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
	const duration = $derived(data.duration);

	/** @type {ImagesResultType | undefined} */
	let imagePreview = $state(undefined);

	/** @type {import('./$types').Snapshot<ImagesResultType | undefined>} */
	export const snapshot = {
		capture: () => imagePreview,
		restore: (value) => (imagePreview = value)
	};
</script>

<svelte:head><title>{title}</title></svelte:head>

<Header {query} {category} />
{#if results.length !== 0}
	<Stats numOfResults={results.length} {duration} />
{/if}

<!-- Gadgets -->
{#if data.exchange}
	{@const from = data.exchange.from}
	{@const to = data.exchange.to}
	{@const amount = data.exchange.amount}
	{@const currencies = data.exchange.currencies}
	<Exchange {from} {to} {amount} {currencies} />
{:else if browser}
	{#key query}
		{#if timery(query)}
			<Timer {query} />
		{/if}
	{/key}
{/if}

{#if results.length === 0}
	<Zero />
{:else if assertImagesResultType(results, category)}
	<Images {browser} {query} {category} {currentPage} {results} bind:imagePreview />
{:else}
	<General {browser} {query} {category} {currentPage} {results} />
{/if}
