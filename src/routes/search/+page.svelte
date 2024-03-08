<script lang="ts">
	// components
	import Header from '$lib/components/Header.svelte';
	import Loads from '$lib/components/search/load/Loads.svelte';
	import Results from '$lib/components/search/result/Results.svelte';
	import Error from '$lib/components/Error.svelte';

	// types
	import type { PageData, Snapshot } from './$types';

	// parameters
	export let data: PageData;
	let query: string = data.query;

	// variables
	$: title = query === '' ? 'Hearchco Search' : `${query} | Hearchco Search`;

	// snapshots
	export const snapshot: Snapshot = {
		capture: () => query,
		restore: (value) => (query = value)
	};
</script>

<svelte:head><title>{title}</title></svelte:head>

<Header bind:query />

{#await data.streamed.results}
	<Loads {query} />
{:then results}
	<Results {query} {results} />
{:catch err}
	<Error statusCode={'500'} message={'Hearchco API failed.'} {err} />
{/await}
