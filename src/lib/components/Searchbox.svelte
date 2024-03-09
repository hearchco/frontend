<script lang="ts">
	// components
	import Logo from '$lib/components/Logo.svelte';

	// parameters
	export let query: string;
	export let homepage: boolean = false;
	export let categories: boolean = false;

	// functions
	import { categoryFrom, hasCategory } from '$lib/functions/categoryFrom';

	// types
	import { CategoryEnum } from '$lib/types/category';
</script>

<form
	class="flex flex-col w-full justify-center items-center"
	method="get"
	action="/search"
	on:submit
>
	<div class="flex w-full justify-center items-center">
		{#if categories}
			<div>
				<div class="grid">
					<a class="col-start-1 row-start-1" draggable="false" href="/">
						<Logo classes="col-start-1 row-start-1 h-16 w-16 mr-6 md:mr-8 pointer-events-none" />
					</a>
				</div>
			</div>
		{/if}
		<div
			class:shadow-2xl={homepage}
			class:shadow-lg={!homepage}
			class="dark:bg-zinc-800 flex h-12 w-full rounded-full dark:shadow-none border border-gray-100 dark:border-0 dark:text-white"
		>
			<!-- svelte-ignore a11y-autofocus -->
			<input
				name="q"
				class="ml-4 h-full w-full bg-transparent focus:outline-none"
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
			{#if query !== ''}
				<button
					type="button"
					class="text-zinc-500 hover:text-hearchco-primary hover:dark:text-hearchco-secondary h-full w-8 ml-0.5 mr-1.5 rounded-full bg-transparent max-[200px]:hidden duration-200 ease-in-out"
					on:click={() => (query = '')}
				>
					<svg class="h-1/2 w-full bg-transparent" viewBox="0 0 512 512" aria-hidden="true">
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
				type="submit"
				class="shrink-0 text-hearchco-primary dark:text-hearchco-secondary hover:text-zinc-900 hover:bg-hearchco-primary hover:dark:bg-hearchco-secondary h-full w-10 min-[320px]:w-16 sm:w-20 rounded-full bg-transparent duration-200 ease-in-out"
			>
				<svg class="mx-auto h-1/2 w-full bg-transparent" viewBox="0 0 512 512" aria-hidden="true">
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
		{#if categories}
			<div class="w-0 md:w-16 md:ml-8" />
		{/if}
	</div>
	{#if categories}
		<div class="mx-4 w-full max-w-screen-md min-w-fit mt-2 mb-2 h-5 flex gap-1">
			{#each Object.values(CategoryEnum) as category}
				<button
					on:click={() => {
						if (!hasCategory(query)) {
							query = '!' + category + ' ' + query;
						} else {
							query = '!' + category + ' ' + query.substring(query.indexOf(' ') + 1);
						}
					}}
					type="submit"
					class:border-hearchco-primary={categoryFrom(query) === category}
					class:dark:border-hearchco-secondary={categoryFrom(query) === category}
					class:hover:border-hearchco-primary={categoryFrom(query) !== category}
					class:hover:dark:border-hearchco-secondary={categoryFrom(query) !== category}
					class="capitalize flex items-center dark:text-white hover:border-hearchco-primary hover:dark:border-hearchco-secondary border-b-2 p-3 pb-4 duration-200 ease-in-out"
				>
					{category}
				</button>
			{/each}
		</div>
	{/if}
</form>
