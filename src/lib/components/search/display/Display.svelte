<script lang="ts">
	// components
	import Results from '$lib/components/search/display/general/Results.svelte';
	import Images from '$lib/components/search/display/images/Images.svelte';
	import Error from '$lib/components/Error.svelte';

	// functions
	import { categoryFrom } from '$lib/functions/categoryFrom';

	// types
	import type { ResultType } from '$lib/types/result';
	import { CategoryEnum } from '$lib/types/category';

	// parameters
	export let query: string;
	export let currentPage: number;
	export let results: ResultType[];
	export let paramsString: string;

	// variables
	const category: string = categoryFrom(query);
</script>

<!-- todo: await deep results and offer button to switch to them -->
{#if category === CategoryEnum.IMAGES}
	<Images bind:currentPage bind:results bind:paramsString />
{:else if category !== undefined}
	<Results bind:query bind:currentPage bind:results />
{:else}
	<Error statusCode={'500'} message={'Unknown category requested.'} />
{/if}
