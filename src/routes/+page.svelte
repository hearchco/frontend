<script>
	import Logo from '$lib/assets/logo.svg';
	import { sleep } from '$lib/functions/sleep/sleep.js';
	import Searchbox from '$lib/components/searchbox/main.svelte';

	let loading = $state(false);

	let easteregg = $state(false);
	async function swing() {
		if (!loading && !easteregg) {
			easteregg = true;
			await sleep(1500); // tailwindcss has this set for animation duration as well
			easteregg = false;
		}
	}
</script>

<svelte:head><title>Hearchco</title></svelte:head>

<div class="pt-36 flex place-content-center">
	<img
		ondblclick={swing}
		class:animate-swing={easteregg}
		class:animate-swing-infinite={loading && !easteregg}
		class="size-32 sm:size-40"
		src={Logo}
		alt="Hearchco"
		draggable="false"
	/>
</div>

<div class="mx-auto py-8 max-w-screen-md">
	<Searchbox homepage={true} bind:loading />
</div>
