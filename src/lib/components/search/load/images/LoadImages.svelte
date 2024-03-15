<script lang="ts">
	// components
	import LoadImage from '$lib/components/search/load/images/LoadImage.svelte';

	// variables
	const numberOfResults: number = 32;
</script>

<div class="px-4 py-8">
	<section id="images" class="grid grid-cols-fit auto-rows-[200px] grid-flow-dense gap-2">
		{#each { length: numberOfResults } as _, i}
			<div class="flex-none">
				<LoadImage colored={Math.random() <= 0.1} />
			</div>
		{/each}
	</section>
</div>
