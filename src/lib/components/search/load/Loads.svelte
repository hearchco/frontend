<script lang="ts">
	// components
	import Error from '$lib/components/Error.svelte';
	import Load from '$lib/components/search/load/Load.svelte';
	import LoadImage from '$lib/components/search/load/LoadImage.svelte';

	// functions
	import { categoryFrom } from '$lib/functions/categoryFrom';

	// types
	import { CategoryEnum } from '$lib/types/category';
	import { randomWidth } from '$lib/types/width';

	// parameters
	export let query: string;

	// variables
	const category: string = categoryFrom(query);
	const numberOfResults: number = 32;
</script>

{#if category === CategoryEnum.IMAGES}
	<div class="px-4 py-8">
		<section id="images" class="flex flex-wrap justify-center gap-2">
			{#each { length: numberOfResults } as _, i}
				<div class="flex-none">
					{#if i % 3 === 0 && i % Math.floor(2 * Math.random()) !== 0}
						<LoadImage colored={true} width={randomWidth()} />
					{:else}
						<LoadImage width={randomWidth()} />
					{/if}
				</div>
			{/each}
		</section>
	</div>
{:else if category !== undefined}
	<div class="sm:mx-auto mb-4 max-w-screen-sm">
		<section id="results" class="mx-2 my-4">
			{#each { length: numberOfResults } as _, i}
				<Load />
				{#if i !== numberOfResults - 1}
					<hr class="my-2 border border-gray-200 dark:border-gray-600" />
				{/if}
			{/each}
		</section>
	</div>
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
