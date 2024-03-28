<script lang="ts">
	// functions
	import { fetchResultsLazily } from "$lib/functions/fetchResultsLazily";

	// types
	import type { ResultType } from "$lib/types/result";

	// parameters
	export let start: number;
	export let results: ResultType[];
	export let paramsString: string;

	// variables
	let offset: number = 0;
	let offsetIncrement: number = 5;
</script>

<!-- TODO: revert back to form for no-JS users but use enhancing to load the results lazily like below -->
<div class="pb-5 flex flex-row justify-center">
	<button
		on:click={async () => {
			[offset, results] = await fetchResultsLazily(start, offset, offsetIncrement, results, paramsString);
		}}
		type="button"
		class="mx-auto mb-5 h-12 w-1/5 rounded-lg overflow-hidden dark:bg-zinc-800 hover:dark:bg-zinc-700 hover:ring-2 hover:ring-hearchco-primary hover:dark:ring-hearchco-secondary text-zinc-500 dark:text-zinc-200 hover:text-hearchco-primary hover:dark:text-hearchco-secondary shadow-sm dark:shadow-none border border-gray-100 dark:border-0 duration-200 ease-in-out"
	>
		Show more
	</button>
</div>
