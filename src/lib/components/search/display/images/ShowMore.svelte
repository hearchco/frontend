<script lang="ts">
	// functions
	import { fetchResultsLazily } from '$lib/functions/fetchResultsLazily';

	// types
	import type { ResultType } from '$lib/types/result';

	// parameters
	export let query: string;
	export let start: number;
	export let results: ResultType[];
	export let paramsString: string;

	// variables
	let offset: number = 1;
	let pages: number = 2;

	// functions
	const handleSubmit = async () => {
		const [newOffset, newResults]: [number, ResultType[]] = await fetchResultsLazily(
			query,
			start,
			offset,
			pages,
			results,
			paramsString
		);
		offset = newOffset;
		results = newResults;
	};
</script>

<form
	on:submit|preventDefault={handleSubmit}
	method="get"
	action="/search"
	class="pb-5 flex flex-row justify-center"
>
	<input type="hidden" name="q" value={query} />
	<input type="hidden" name="start" value={start + offset} />
	<input type="hidden" name="pages" value={pages} />
	<button
		type="submit"
		class="mx-auto mb-5 h-12 w-1/2 sm:w-1/3 lg:w-1/4 2xl:w-1/5 rounded-lg overflow-hidden dark:bg-zinc-800 hover:dark:bg-zinc-700 hover:ring-2 hover:ring-hearchco-primary hover:dark:ring-hearchco-secondary text-zinc-500 dark:text-zinc-200 hover:text-hearchco-primary hover:dark:text-hearchco-secondary shadow-sm dark:shadow-none border border-gray-100 dark:border-0 duration-200 ease-in-out"
	>
		Show more
	</button>
</form>
