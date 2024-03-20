<script lang="ts">
	// components
	import LoadImage from '$lib/components/search/load/images/LoadImage.svelte';
	import type { ImageFormat } from '$lib/types/result';

	// variables
	const numberOfResults: number = 32;
	const fakeImages: ImageFormat[] = randomImages();

	function randomNumber(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	function randomImages(): ImageFormat[] {
		return Array.from({ length: numberOfResults }, (_) => ({
			Height: randomNumber(125, 200),
			Width: randomNumber(100, 300)
		}));
	}
</script>

<div class="w-full px-4 py-8">
	<section id="images" class="grid grid-cols-fit auto-rows-[200px] grid-flow-dense gap-2">
		{#each fakeImages as result}
			<div
				class:row-span-2={(result.Height * 0.8) / result.Width > 1}
				class:sm:col-span-2={result.Height / (result.Width * 0.64) < 1}
				class="flex-none"
			>
				<LoadImage colored={Math.random() <= 0.1} />
			</div>
		{/each}
	</section>
</div>
