<script lang="ts">
	// assets
	import DarkThemeLogo from '$lib/assets/dark.svg';
	import LightThemeLogo from '$lib/assets/light.svg';

	// functions
	import { onMount } from 'svelte';

	// variables
	let darkMode: boolean;

	onMount(() => {
		const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const theme = localStorage.getItem('theme');

		if (theme === 'dark') {
			darkMode = true;
		} else if (theme === 'light') {
			darkMode = false;
		} else {
			darkMode = prefersDarkMode;
		}
	});

	function toggleDarkMode() {
		darkMode = !darkMode;
		localStorage.setItem('theme', darkMode ? 'dark' : 'light');

		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<button class="absolute top-4 right-4" on:click={toggleDarkMode}>
	{#if darkMode}
		<img class="h-12 w-12" src={LightThemeLogo} alt="Light theme" />
	{:else}
		<img class="h-12 w-12" src={DarkThemeLogo} alt="Dark theme" />
	{/if}
</button>
