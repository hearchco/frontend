<script>
	import { CategoryEnum } from '$lib/types/search/category';
	import { getQueryWithoutCategory } from '$lib/functions/query/category';
	import { fetchSuggestions } from '$lib/functions/api/fetchapi';

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
		// @ts-ignore
		loading = $bindable(false)
	} = $props();

	/** @type {string} */
	let currQuery = $state(query);

	/** @type {HTMLElement | null} */
	let searchBox = $state(null);
	/** @type {HTMLElement | null} */
	let searchInput = $state(null);

	// When a suggestion is clicked.
	let clickedIndex = $state(-1);
	// When a suggestion is hovered over or arrow keys are used.
	let currentIndex = $state(-1);

	// Whether to show suggestions or not.
	let shouldShowSuggs = $state(homepage);

	/** @type {SuggestionType[]} */
	let suggestions = $state([]);

	// Determines if the suggestions can be shown.
	let showSuggestions = $derived(shouldShowSuggs && suggestions.length > 0);

	// Updates suggestions when the query changes.
	$effect(() => {
		if (getQueryWithoutCategory(currQuery) === '') {
			suggestions = [];
		} else if (currentIndex === -1) {
			fetchSuggestions(getQueryWithoutCategory(currQuery)).then((resp) => {
				const maxSize = 10;
				if (resp.suggestions.length > maxSize)
					resp.suggestions.splice(maxSize, resp.suggestions.length - maxSize);
				suggestions = resp.suggestions;
			});
		}
	});

	// Old query to allow returning to it.
	let oldQuery = $state(query);

	// Changes the query when the focus is lost.
	$effect(() => {
		if (!shouldShowSuggs) {
			if (currentIndex !== -1) {
				currQuery = suggestions[currentIndex].value;
				currentIndex = -1;
			}
			oldQuery = currQuery;
		}
	});

	/** @param {SubmitEvent} e */
	function handleSubmit(e) {
		if (getQueryWithoutCategory(currQuery) === '') {
			e.preventDefault();
			return;
		}

		if (clickedIndex !== -1) {
			currQuery = suggestions[clickedIndex].value;
		} else if (currentIndex !== -1) {
			currQuery = suggestions[currentIndex].value;
		}

		// Used to activate animation.
		loading = true;

		// Reset the state.
		clickedIndex = -1;
		currentIndex = -1;
		shouldShowSuggs = false;
		suggestions = [];
		oldQuery = currQuery;
	}

	/** @param {KeyboardEvent} event */
	function handleKeyDown(event) {
		switch (event.key) {
			case 'ArrowDown':
			case 'ArrowUp':
				event.preventDefault();

				if (event.key === 'ArrowDown') {
					currentIndex = Math.min(currentIndex + 1, suggestions.length - 1);
				} else {
					currentIndex = Math.max(currentIndex - 1, -1);
				}

				if (currentIndex !== -1) {
					currQuery = suggestions[currentIndex].value;
				} else {
					currQuery = oldQuery;
				}

				break;
			case 'Enter':
				break;
			default:
				currentIndex = -1;
		}
	}

	/** @param {KeyboardEvent} event */
	function handleKeyUp({ key }) {
		switch (key) {
			case 'ArrowDown':
			case 'ArrowUp':
			case 'Enter':
				break;
			default:
				oldQuery = currQuery;
		}
	}
</script>

<svelte:window
	onkeydown={(event) => {
		switch (event.key) {
			case 'Escape':
				searchInput?.blur();
				shouldShowSuggs = false;
				break;
			case '/':
				if (!shouldShowSuggs) {
					event.preventDefault();
					searchInput?.focus();
					shouldShowSuggs = true;
				}
				break;
		}
	}}
	onclick={({ target }) => {
		if (target && target instanceof HTMLElement) {
			if (searchBox && !searchBox.contains(target)) {
				// Disable setting the selected suggestion as query when clicking outside the search box.
				currentIndex = -1;
				searchInput?.blur();
				shouldShowSuggs = false;
			}
		}
	}}
/>

<form
	class:pt-5={category}
	class="px-1 size-full"
	method="get"
	action="/search"
	onsubmit={handleSubmit}
>
	<div bind:this={searchBox} class="relative h-12 flex flex-col">
		<div
			class:shadow-2xl={homepage}
			class:shadow-lg={!homepage}
			class:rounded-t-3xl={showSuggestions}
			class:border-neutral-200={showSuggestions}
			class:dark:border-b-2={showSuggestions}
			class:rounded-full={!showSuggestions}
			class="box-content size-full flex dark:bg-neutral-800 dark:shadow-none border dark:border-0 border-neutral-100 dark:border-neutral-700"
		>
			<!-- svelte-ignore a11y_autofocus -->
			<input
				bind:this={searchInput}
				onfocusin={() => (shouldShowSuggs = true)}
				onkeydown={handleKeyDown}
				onkeyup={handleKeyUp}
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
				bind:value={currQuery}
			/>
			{#if currQuery !== ''}
				<button
					aria-label="Clear search"
					type="reset"
					class="mx-1.5 max-5xs:hidden text-neutral-500 hover:text-hearchco-primary hover:dark:text-hearchco-secondary duration-100 ease-in-out"
					onclick={() => {
						currQuery = '';
						searchInput?.focus();
					}}
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
			{/if}
			<button
				aria-label="Search"
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

		<ul
			onmouseleave={() => (currentIndex = -1)}
			class:hidden={!showSuggestions}
			class="z-50 w-full rounded-b-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-0"
		>
			{#each suggestions as { value }, i}
				{@const first = i === 0}
				{@const last = i === suggestions.length - 1}
				{@const current = currentIndex === i}
				<li
					class:rounded-t-none={first}
					class:pb-0.5={last}
					class:bg-neutral-100={current}
					class:dark:bg-neutral-700={current}
					class="rounded-lg"
				>
					<button
						onmouseover={() => (currentIndex = i)}
						onfocus={() => (currentIndex = i)}
						onclick={() => (clickedIndex = i)}
						type="submit"
						class="px-4 py-0.5 size-full text-left"
					>
						{value}
					</button>
				</li>
			{/each}
		</ul>
	</div>

	{#if !homepage}
		<div class="w-full h-3 flex gap-1">
			{#each Object.values(CategoryEnum) as cat}
				{@const current = cat === category}
				<button
					onclick={() => {
						// Reset the query when the category is changed.
						currQuery = query;
						// Set the category to the clicked one.
						category = cat;
					}}
					type="submit"
					name="category"
					value={cat}
					class:border-hearchco-primary={current}
					class:dark:border-hearchco-secondary={current}
					class="px-2 xs:px-3 pt-[10px] pb-[26px] capitalize border-b-2 hover:border-hearchco-primary hover:dark:border-hearchco-secondary duration-100 ease-in-out"
				>
					{cat}
				</button>
			{/each}
		</div>
	{/if}
</form>
