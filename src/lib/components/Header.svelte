<script lang="ts">
	// assets
	import logo from '$lib/assets/logo.svg';

	// components
	import Searchbox from '$lib/components/Searchbox.svelte';

	// parameters
	export let query: string;

	// types
	import { Categories } from '$lib/types/category';
</script>

<header class="flex flex-col justify-end h-36 items-center border-b-2 border-gray-100 dark:border-zinc-700">
	<div class="mx-4 w-full min-w-fit">
		<div class="md:mx-auto flex max-w-screen-md items-center">
			<div class="grid">
				<a class="col-start-1 row-start-1" draggable="false" href="/">
					<img
						class="col-start-1 row-start-1 h-16 w-16 mr-6 md:mr-8 pointer-events-none"
						src={logo}
						alt="logo"
					/>
				</a>
			</div>
			<Searchbox bind:query />
			<div class="w-0 md:w-16 md:ml-8" />
		</div>
	</div>

	<div class="mx-4 w-full max-w-screen-md min-w-fit mt-2 mb-2 h-5 flex gap-1">
		{#each Object.values(Categories) as category}
			<!-- todo: merge into searchbox & fix layout -->
			<button
				class:border-b-[hearchco-primary]={query.includes(`!`.concat(category))}
				class="capitalize flex items-center shadow-2xl dark:text-white border-b-2 p-3 pb-4"
				>{category}
			</button>
		{/each}
	</div>
</header>
