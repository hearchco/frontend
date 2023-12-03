<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import Searchbox from '$lib/components/Searchbox.svelte';
	let query = '';
</script>

<svelte:head><title>Hearchco</title></svelte:head>

<!-- this is hard fixed top space -->
<div class="mx-4 mb-4 mt-20 min-w-fit">
	<img class="mx-auto h-auto w-40" src={logo} alt="" />
	<div class="mx-auto max-w-screen-sm"><Searchbox bind:query /></div>
</div>
