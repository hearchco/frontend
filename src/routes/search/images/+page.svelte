<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Load from '$lib/components/Load.svelte';
	import ResultImage from '$lib/components/ResultImage.svelte';
	import Error from '$lib/components/Error.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	let query = data.query;

	import type { Snapshot } from './$types';
	export const snapshot: Snapshot = {
		capture: () => query,
		restore: (value) => (query = value)
	};
</script>

<svelte:head><title>Search images | Hearchco</title></svelte:head>

<Header bind:query />

{#await data.streamed.results}
	<Load />
{:then results}
	<section
		id="images"
		class="gap-0 columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-8"
	>
		{#each results as result (result.URL)}
			<ResultImage {result} />
		{/each}
	</section>
{:catch error}
	<Error statusCode={'500'} message={'Hearchco API failed.'} {error} />
{/await}
