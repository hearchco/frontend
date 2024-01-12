<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import Searchbox from '$lib/components/Searchbox.svelte';
	let query = '';

	import type { Snapshot } from './$types';
	export const snapshot: Snapshot = {
		capture: () => query,
		restore: (value) => (query = value)
	};
</script>

<svelte:head><title>Hearchco</title></svelte:head>

<!-- this is hard fixed top space -->
<div class="mx-4 mb-4 mt-36 min-w-fit">
	<img class="mx-auto h-40 w-40 mb-8 pointer-events-none" src={logo} alt="logo" />
	<div class="mx-auto max-w-screen-sm"><Searchbox bind:query /></div>
</div>
