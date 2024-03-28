<script lang="ts">
	// components
	import Header from '$lib/components/Header.svelte';
	import Load from '$lib/components/search/load/Load.svelte';
	import Display from '$lib/components/search/display/Display.svelte';
	import Error from '$lib/components/Error.svelte';

	// types
	import type { PageData, Snapshot } from './$types';

	// parameters
	export let data: PageData;
	let query: string = data.query;
	let currentPage: number = data.currentPage;
	let paramsString: string = data.params;
	// TODO: implement a option for setting maxPages, allowing user to choose how much results to show
	// let maxPages: number = data.maxPages;

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
	<Load {query} />
{:then results}
	<Display bind:query bind:currentPage bind:paramsString {results} />
{:catch err}
	<Error statusCode={'500'} message={'Hearchco API failed.'} {err} />
{/await}
