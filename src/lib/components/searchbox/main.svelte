<script>
	import { CategoryEnum } from '$lib/types/search/category';
	import { getQueryWithoutCategory } from '$lib/functions/query/category';
	import { fetchSuggestions } from '$lib/functions/api/fetchsuggestions';

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
		query = '',
		category = CategoryEnum.GENERAL,
		loading = $bindable(false)
	} = $props();

	/** @param {SubmitEvent} e */
	function handleSubmit(e) {
		if (query === '') {
			e.preventDefault();
		} else if (!loading) {
			loading = true;
		}
	}

	function handleCategory() {
		query = getQueryWithoutCategory(query);
	}

	function handleReset() {
		query = '';
		document.getElementById('search-input')?.focus();
	}

	/** @type {number} */
	let currentIndex = $state(-1);

	/** @param {KeyboardEvent} event */
	async function handleKeyDown(event) {
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault();
			const suggs = await suggestions;
			if (event.key === 'ArrowDown') {
				currentIndex = Math.min(currentIndex + 1, suggs.length - 1);
			} else if (event.key === 'ArrowUp') {
				currentIndex = Math.max(currentIndex - 1, -1);
			}
		} else if (event.key === 'Enter' && currentIndex !== -1) {
			query = (await suggestions)[currentIndex].value;
			ableToShowSuggs = false;
		} else {
			currentIndex = -1;
		}
	}

	let ableToShowSuggs = $state(false);
	let suggestionsLength = $state(0);
	let showSuggestions = $derived(
		(!homepage || !loading) && ableToShowSuggs && suggestionsLength > 0
	);

	/** @type {Promise<SuggestionType[]>} */
	let suggestions = $derived.by(async () => {
		if (query === '') {
			suggestionsLength = 0;
			return [];
		} else {
			suggestionsLength = 0;
			const suggs = await fetchSuggestions(query);
			suggestionsLength = suggs.length;
			if (suggs.length > 10) suggs.splice(10, suggs.length - 10);
			return suggs;
		}
	});
</script>

<form
	class:pt-5={category}
	class="px-1 size-full"
	id="search-form"
	method="get"
	action="/search"
	onsubmit={handleSubmit}
>
	<div class="relative h-12 flex flex-col">
		<div
			class:shadow-2xl={homepage}
			class:shadow-lg={!homepage}
			class:rounded-t-3xl={showSuggestions}
			class:border-neutral-200={showSuggestions}
			class:dark:border-b-2={showSuggestions}
			class:rounded-full={!showSuggestions}
			class="size-full flex dark:bg-neutral-800 dark:shadow-none border dark:border-0 border-neutral-100 dark:border-neutral-700"
		>
			<!-- svelte-ignore a11y_autofocus -->
			<input
				onfocusin={() => (ableToShowSuggs = true)}
				onfocusout={() => (ableToShowSuggs = false)}
				onkeydown={handleKeyDown}
				id="search-input"
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
				class="mx-1.5 max-5xs:hidden text-neutral-500 hover:text-hearchco-primary hover:dark:text-hearchco-secondary duration-100 ease-in-out"
				onclick={handleReset}
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
				class:rounded-br-none={showSuggestions}
				class="shrink-0 h-full w-10 3xs:w-16 sm:w-20 rounded-full text-hearchco-primary dark:text-hearchco-secondary hover:text-hearchco-secondary hover:dark:text-hearchco-primary hover:bg-hearchco-primary hover:dark:bg-hearchco-secondary duration-100 ease-in-out"
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

		{#await suggestions then suggestions}
			{#if showSuggestions}
				<ul
					onmouseleave={() => (currentIndex = -1)}
					class="w-full rounded-b-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-0"
				>
					{#each suggestions as suggestion, i}
						<li
							class:rounded-t-none={i === 0}
							class:pb-1={i === suggestions.length - 1}
							class:bg-neutral-100={currentIndex === i}
							class:dark:bg-neutral-700={currentIndex === i}
							class="rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
						>
							<button
								onmouseover={() => (currentIndex = i)}
								onfocus={() => (currentIndex = i)}
								onmousedown={() => {
									query = suggestion.value;
									ableToShowSuggs = false;
								}}
								class="px-4 py-0.5 size-full text-left"
								type="submit"
								value={suggestion.value}
							>
								{suggestion.value}
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		{/await}
	</div>

	{#if !homepage}
		<div class="w-full h-3 flex gap-1">
			{#each Object.values(CategoryEnum) as cat}
				<button
					onclick={handleCategory}
					type="submit"
					name="category"
					value={cat}
					class:border-hearchco-primary={cat === category}
					class:dark:border-hearchco-secondary={cat === category}
					class="px-2 xs:px-3 pt-[10px] pb-[26px] capitalize border-b-2 hover:border-hearchco-primary hover:dark:border-hearchco-secondary duration-100 ease-in-out"
				>
					{cat}
				</button>
			{/each}
		</div>
	{/if}
</form>
