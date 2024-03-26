<script lang="ts">
	// components
	import Error from '$lib/components/Error.svelte';
	import LoadResults from '$lib/components/search/load/general/LoadResults.svelte';
	import LoadImages from '$lib/components/search/load/images/LoadImages.svelte';

	// functions
	import { categoryFrom } from '$lib/functions/categoryFrom';

	// types
	import { CategoryEnum } from '$lib/types/category';

	// parameters
	export let query: string;

	// variables
	const category: string = categoryFrom(query);
</script>

{#if category === CategoryEnum.IMAGES}
	<LoadImages />
{:else if category !== undefined}
	<LoadResults />
{:else}
	<Error statusCode={'500'} message={'Unknown category requested.'} />
{/if}

<!-- this will never render -->
{#if false}
	<!-- needed for randomWidth to work because if classes aren't used anywhere TailwindCSS won't include them -->
	<div class="hidden w-32"></div>
	<div class="hidden w-36"></div>
	<div class="hidden w-40"></div>
	<div class="hidden w-44"></div>
	<div class="hidden w-48"></div>
	<div class="hidden w-52"></div>
	<div class="hidden w-56"></div>
	<div class="hidden w-60"></div>
	<div class="hidden w-64"></div>
	<div class="hidden w-72"></div>
{/if}
