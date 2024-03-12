<!-- used for general results -->

<script lang="ts">
	// parameters
	export let query: string;
	export let currentPage: number;

	// variables
	let numberOfPages: number = 5;
	let offset: number = 0;

	if (currentPage > 3) {
		offset = currentPage - 3;
	}

	function selected(index: number) {
		return currentPage === calcPageNum(index);
	}
	function calcPageNum(index: number) {
		return index + offset + 1;
	}
</script>

<form class="pb-5 flex flex-row justify-center" method="get" action="/search" on:submit>
	<input type="hidden" name="q" bind:value={query} />
	{#each { length: numberOfPages } as _, i}
		<div
			class:dark:bg-zinc-700={selected(i)}
			class:ring-2={selected(i)}
			class:ring-hearchco-primary={selected(i)}
			class:dark:ring-hearchco-secondary={selected(i)}
			class:dark:bg-zinc-800={!selected(i)}
			class:hover:dark:bg-zinc-700={!selected(i)}
			class:hover:ring-2={!selected(i)}
			class:hover:ring-hearchco-primary={!selected(i)}
			class:hover:dark:ring-hearchco-secondary={!selected(i)}
			class="mx-1 rounded-lg overflow-hidden text-zinc-500 dark:text-zinc-200 hover:text-hearchco-primary hover:dark:text-hearchco-secondary shadow-lg border border-gray-100 dark:border-0 duration-200 ease-in-out"
		>
			<!-- TODO: on:focus={() => preloadData(`/search?q=${query}&start=${calcPageNum(i)}`)}
				on:mouseover={() => preloadData(`/search?q=${query}&start=${calcPageNum(i)}`)} -->
			<button
				on:click={() => (currentPage = calcPageNum(i))}
				type="submit"
				class="w-8 h-8"
				name="start"
				value={calcPageNum(i)}
			>
				{calcPageNum(i)}
			</button>
		</div>
	{/each}
</form>
