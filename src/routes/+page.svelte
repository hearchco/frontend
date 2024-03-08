<script lang="ts">
	// assets
	import logo from '$lib/assets/logo.svg';

	// components
	import Searchbox from '$lib/components/Searchbox.svelte';

	// types
	import type { Snapshot } from './$types';

	// variables
	let query: string = '';
	let easteregg: boolean = false;

	// snapshots
	export const snapshot: Snapshot = {
		capture: () => query,
		restore: (value) => (query = value)
	};
</script>

<svelte:head><title>Hearchco</title></svelte:head>

<div class="mx-4 mb-4 mt-36 min-w-fit">
	<img
		on:dblclick={() => (easteregg = !easteregg)}
		class:animate-bounce={easteregg}
		class="mx-auto h-40 w-40 mb-8"
		src={logo}
		alt="logo"
	/>
	<div class="mx-auto max-w-screen-sm"><Searchbox bind:query homepage={true} /></div>
</div>
