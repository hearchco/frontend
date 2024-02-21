<script lang="ts">
	// components
	import Error from '$lib/components/Error.svelte';
	import Load from '$lib/components/search/load/Load.svelte';
	import LoadImage from '$lib/components/search/load/LoadImage.svelte';

	// functions
	import { categoryFrom } from '$lib/functions/categoryFrom';

	// parameters
	export let query;

	// variables
	const category = categoryFrom(query);
	const numberOfResults = 10;
	const numberOfImages = 30;
</script>

{#if category === 'GENERAL'}
	<Load number={numberOfResults} />
{:else if category === 'IMAGE'}
	<LoadImage number={numberOfImages} />
{:else}
	<Error statusCode={'500'} message={'Unknown category requested.'} />
{/if}
