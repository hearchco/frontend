<script lang="ts">
	export let number: number;
</script>

<section
	id="images"
	class="gap-0 columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-8"
>
	{#each { length: number } as _}
		<div class="w-full animate-pulse">
			<div class="w-full h-[200px] bg-gray-800 dark:bg-gray-400 rounded-lg"></div>
		</div>
	{/each}
</section>
