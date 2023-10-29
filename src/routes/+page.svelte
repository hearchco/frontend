<script>
	import Searchbox from '$lib/components/Searchbox.svelte';
</script>

<svelte:head><title>BrzaGuza</title></svelte:head>

<!-- this is hard fixed top space -->
<div class="mx-auto mb-4 mt-20 min-w-fit max-w-screen-sm">
	<div>
		<img class="mx-auto h-40 w-40" src="/img/brzaguza.svg" alt="" />
	</div>
	<div class="mx-4 min-w-fit max-w-full"><Searchbox /></div>
</div>
