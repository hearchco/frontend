<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Load from '$lib/components/Load.svelte';
	import Result from '$lib/components/Result.svelte';
	import Error from '$lib/components/Error.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head><title>Search | Hearchco</title></svelte:head>

<Header query={data.query} />

{#await data.streamed.results}
	<!-- todo: will change animation if not up to standard -->
	<Load />
{:then results}
	<div class="sm:mx-auto mb-4 max-w-screen-sm">
		<div id="result-list" class="mx-2 my-4 max-w-fit overflow-clip">
			{#each results as result (result.URL)}
				<Result {result} />
				<hr class="my-2 border border-gray-200 dark:border-gray-600" />
			{/each}
		</div>
	</div>
{:catch error}
	<Error statusCode={'500'} message={'Hearchco API failed.'} {error} />
{/await}
