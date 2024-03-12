<script lang="ts">
	// components
	import LoadImage from '$lib/components/search/load/images/LoadImage.svelte';

	// types
	import { randomWidth } from '$lib/types/width';

	// variables
	const numberOfResults: number = 32;
</script>

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
