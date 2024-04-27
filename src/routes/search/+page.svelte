<script lang="ts">
	// components
	import Header from '$lib/components/Header.svelte';
	import Load from '$lib/components/search/load/Load.svelte';
	import Display from '$lib/components/search/display/Display.svelte';
	import Error from '$lib/components/Error.svelte';

	// types
	import type { PageData, Snapshot } from './$types';
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let data: PageData;

	// variables
	let query = data.query;
	$: currentPage = data.currentPage;
	$: paramsString = data.params;
	// TODO: implement a option for setting maxPages, allowing user to choose how much results to show
	// $: maxPages = data.maxPages;
	$: title = query === '' ? 'Hearchco Search' : `${query} | Hearchco Search`;

	// snapshots
	let imgResultPreview: ResultType | undefined;
	export const snapshot: Snapshot<ResultType | undefined> = {
		capture: () => imgResultPreview,
		restore: (value) => (imgResultPreview = value)
	};
</script>

<svelte:head><title>{title}</title></svelte:head>

<Header bind:query />

{#await data.streamed.results}
	<Load {query} />
{:then results}
	<Display bind:query bind:currentPage bind:paramsString bind:imgResultPreview {results} />
{:catch err}
	<Error statusCode={'500'} message={'Hearchco API failed.'} {err} />
{/await}
