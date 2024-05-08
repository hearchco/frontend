<script>
	import Logo from '$lib/assets/logo.svg';
	import { sleep } from '$lib/functions/sleep/sleep.js';
	import Searchbox from '$lib/components/searchbox/main.svelte';

	let easteregg = false;
	async function swing() {
		if (!easteregg) {
			easteregg = true;
			await sleep(1500); // tailwindcss has this set for animation duration as well
			easteregg = false;
		}
	}
</script>

<svelte:head><title>Hearchco</title></svelte:head>

<div class="pt-36 flex place-content-center">
	<img
		on:dblclick={swing}
		class:animate-swing={easteregg}
		class="size-40"
		src={Logo}
		alt="Hearchco"
		draggable="false"
	/>
</div>

<div class="mx-auto max-w-screen-md">
	<div class="mx-1.5 sm:mx-4 my-8">
		<Searchbox homepage={true} />
	</div>
</div>
