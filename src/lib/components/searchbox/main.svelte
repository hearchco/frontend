<script>
	import {
		CategoryEnum,
		VisibleCategoryEnum,
		convertCategoryToVisible
	} from '$lib/types/search/category';
	import { removeCatFromQuery } from '$lib/functions/query/removecat';

	/**
	 * @typedef {object} Props
	 * @property {boolean} [homepage]
	 * @property {string} [query]
	 * @property {string} [category]
	 * @property {boolean} [loading]
	 */

	/** @type {Props} */
	let {
		homepage = false,
		query = $bindable(''),
		category = CategoryEnum.GENERAL,
		loading = $bindable(false)
	} = $props();

	/** @param {SubmitEvent} e */
	function handleSubmit(e) {
		if (query === '') {
			e.preventDefault();
		} else {
			loading = true;
		}
	}

	function handleCategory() {
		query = removeCatFromQuery(query);
	}
</script>

<form
	class:pt-5={category}
	class="mx-2 size-full"
	method="get"
	action="/search"
	onsubmit={handleSubmit}
>
	<div
		class:shadow-2xl={homepage}
		class:shadow-lg={!homepage}
		class="h-12 w-full flex rounded-full dark:bg-neutral-800 dark:shadow-none border border-neutral-100 dark:border-0"
	>
		<!-- svelte-ignore a11y_autofocus -->
		<input
			name="q"
			class="ml-4 mr-1.5 h-full w-full bg-transparent focus:outline-none"
			type="text"
			placeholder="Hearch..."
			autocomplete="off"
			autocapitalize="none"
			spellcheck="false"
			autocorrect="off"
			dir="auto"
			autofocus={homepage}
			bind:value={query}
		/>
		<button
			type="reset"
			class:hidden={query === ''}
			class="mx-1.5 max-[200px]:hidden text-neutral-500 hover:text-hearchco-primary hover:dark:text-hearchco-secondary duration-100 ease-in-out"
			onclick={() => (query = '')}
		>
			<svg class="size-6" viewBox="0 0 512 512" aria-hidden="true">
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
					d="M368 368L144 144M368 144L144 368"
				></path>
			</svg>
		</button>
		<button
			type="submit"
			name="category"
			value={category}
			class="shrink-0 h-full w-10 min-[320px]:w-16 sm:w-20 rounded-full text-hearchco-primary dark:text-hearchco-secondary hover:text-hearchco-secondary hover:dark:text-hearchco-primary hover:bg-hearchco-primary hover:dark:bg-hearchco-secondary duration-100 ease-in-out"
		>
			<svg class="mx-auto h-1/2 w-auto" viewBox="0 0 512 512" aria-hidden="true">
				<path
					d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
					fill="none"
					stroke="currentColor"
					stroke-miterlimit="10"
					stroke-width="32"
				/>
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-miterlimit="10"
					stroke-width="32"
					d="M338.29 338.29L448 448"
				/>
			</svg>
		</button>
	</div>
	{#if !homepage}
		<div class="w-full h-5 flex gap-1">
			{#each Object.values(VisibleCategoryEnum) as cat}
				<button
					onclick={handleCategory}
					type="submit"
					name="category"
					value={cat}
					class:border-hearchco-primary={cat === convertCategoryToVisible(category)}
					class:dark:border-hearchco-secondary={cat === convertCategoryToVisible(category)}
					class="px-3 pt-7 pb-6 capitalize border-b-2 hover:border-hearchco-primary hover:dark:border-hearchco-secondary duration-100 ease-in-out"
				>
					{cat}
				</button>
			{/each}
		</div>
	{/if}
</form>
