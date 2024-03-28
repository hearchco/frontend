<script lang="ts">
	// components
	import Logo from '$lib/components/Logo.svelte';
	import Searchbox from '$lib/components/Searchbox.svelte';

	// types
	import type { Snapshot } from './$types';

	// variables
	let query: string = '';

	// snapshots
	export const snapshot: Snapshot = {
		capture: () => query,
		restore: (value) => (query = value)
	};
</script>

<svelte:head><title>Hearchco</title></svelte:head>

<div class="mx-4 mb-4 mt-36 min-w-fit">
	<Logo classes="mx-auto h-40 w-40 mb-8" />
	<div class="mx-auto max-w-screen-sm"><Searchbox bind:query homepage={true} /></div>
</div>
