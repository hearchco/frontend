<!-- used for image results -->

<script lang="ts">
	// parameters
	export let query: string;
	export let maxPages: number = 1;
</script>

<form class="pb-5 flex flex-row justify-center" method="get" action="/search" on:submit>
	<input type="hidden" name="q" bind:value={query} />
	<button
		on:click={() => (maxPages += 1)}
		type="submit"
		class="mx-auto mb-5 h-12 w-1/5 rounded-lg overflow-hidden dark:bg-zinc-800 hover:dark:bg-zinc-700 hover:ring-2 hover:ring-hearchco-primary text-zinc-500 dark:text-zinc-200 hover:text-hearchco-primary shadow-sm dark:shadow-none border border-gray-100 dark:border-0 duration-200 ease-in-out"
		name="pages"
		value={maxPages}
	>
		Show more
	</button>
</form>
