<script>
	import Logo from '$lib/assets/logo.svg';
	import Searchbox from '$lib/components/searchbox/main.svelte';

	/**
	 * @typedef {object} Props
	 * @property {string} query
	 * @property {string} category
	 */

	/** @type {Props} */
	let { query = $bindable(), category } = $props();
</script>

<header class="border-b-2 border-neutral-100 dark:border-neutral-700">
	<div class="mx-auto py-6 max-w-screen-md flex items-center">
		<a href="/" class="hidden xs:block p-1" draggable="false">
			<img class="size-[72px] pointer-events-none" src={Logo} alt="Hearchco" />
		</a>
		<Searchbox bind:query {category} />
		<span class="max-sm:hidden size-20"></span>
	</div>
</header>
