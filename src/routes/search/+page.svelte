<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import Searchbox from '$lib/components/Searchbox.svelte';
	import Load from '$lib/components/Load.svelte';
	import Error from '$lib/components/Error.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head><title>Search | Hearchco</title></svelte:head>

<!-- Header section -->
<header
	class="custom-bg-headfoot dark:custom-bg-headfoot flex h-36 items-center border border-gray-100 dark:border-0"
>
	<div class="mx-4 w-full min-w-fit">
		<div class="md:mx-auto flex max-w-screen-md items-center">
			<div class="grid">
				<img class="col-start-1 row-start-1 h-16 w-16 mr-6 md:mr-8 pointer-events-none" src={logo} alt="logo" />
				<a class="col-start-1 row-start-1" draggable="false" href="/"> 
				</a>
			</div>
			
			<Searchbox bind:query={data.query} />
			<div class="w-0 md:w-16 md:ml-8" />
		</div>
	</div>
</header>

{#await data.streamed.results}
	<!-- todo: lazy loading animation -->
	<Load />
{:then results}
	<div class="sm:mx-auto mb-4 max-w-screen-sm">
		<div id="result-list" class="mx-2 my-4 max-w-fit overflow-clip">
			{#each results as result (result.URL)}
				<article id="result-{result.Rank}">
					<a id="link" href={result.URL} class="dark:text-white" rel="noreferrer">{result.URL}</a>
					<h1
						id="title"
						class="hearchco-text-primary text-xl hover:underline"
					>
						<a href={result.URL} rel="noreferrer">{result.Title}</a>
					</h1>
					<p id="description" class="my-1 text-justify text-sm text-gray-600 dark:text-gray-200">
						{result.Description}
					</p>
					<div id="engines" class="my-2 text-right text-xs text-gray-800 dark:text-gray-400">
						{#each result.EngineRanks as engineRank (engineRank.SearchEngine)}
							<span class="mx-0.5">{engineRank.SearchEngine}</span>
						{/each}
					</div>
				</article>
				<hr class="my-2 border border-gray-200 dark:border-gray-600" />
			{/each}
		</div>
	</div>
{:catch error}
	<Error statusCode={'500'} message={'Hearchco API failed.'} />
{/await}