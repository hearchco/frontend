<script lang="ts">
	// assets
	import logo from '$lib/assets/logo.svg';

	// functions
	import { sleep } from '$lib/functions/sleep';

	// parameters
	export let classes: string = '';

	// variables
	let easteregg: boolean = false;

	async function doADance() {
		if (!easteregg) {
			easteregg = true;
			await sleep(1500); // tailwindcss has this set for animation duration
			easteregg = false;
		}
	}
</script>

<img
	on:dblclick={doADance}
	class:animate-swing={easteregg}
	class={classes}
	src={logo}
	alt="Hearchco"
/>
