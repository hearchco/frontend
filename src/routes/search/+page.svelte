<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Load from '$lib/components/Load.svelte';
	import Result from '$lib/components/Result.svelte';
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

<svelte:head><title>{query} | Hearchco Search</title></svelte:head>

<Header bind:query />

{#await data.streamed.results}
	<!-- todo: will change animation if not up to standard -->
	<Load />
{:then results}
	<!-- todo: await deep results and offer button to switch to them -->
	<div class="sm:mx-auto mb-4 max-w-screen-sm">
		<section id="result-list" class="mx-2 my-4 max-w-fit overflow-clip">
			{#each results as result (result.URL)}
				<Result {result} />
				<hr class="my-2 border border-gray-200 dark:border-gray-600" />
			{/each}
		</section>
	</div>
{:catch error}
	<Error statusCode={'500'} message={'Hearchco API failed.'} {error} />
{/await}
