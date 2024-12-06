<script>
	import { onMount } from 'svelte';

	/**
	 * @typedef {object} Props
	 * @property {boolean} [browser]
	 */

	/** @type {Props} */
	let { browser = false } = $props();

	/** @type {'light' | 'dark' | 'system'} */
	let selected = $state('system');
	/** @type {'light' | 'dark'} */
	let system = $state('light');
	/** @type {'light' | 'dark'} */
	const theme = $derived(selected === 'system' ? system : selected);

	// Load theme from local storage.
	onMount(() => {
		const value = localStorage.getItem('theme');
		if (value === 'light' || value === 'dark') selected = value;
	});

	// Load system theme and update it when it changes.
	onMount(() => {
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		system = media.matches ? 'dark' : 'light';
		media.addEventListener('change', (e) => {
			system = e.matches ? 'dark' : 'light';
		});
	});

	// Update the DOM with the current theme.
	$effect(() => {
		if (theme === 'light') {
			document.documentElement.classList.add('light');
			document.documentElement.classList.remove('dark');
		} else {
			document.documentElement.classList.remove('light');
			document.documentElement.classList.add('dark');
		}
	});

	// Save / remove theme to / from local storage.
	$effect(() => {
		if (selected === 'system') {
			localStorage.removeItem('theme');
		} else {
			localStorage.setItem('theme', selected);
		}
	});

	// Toggle theme when button is clicked.
	function toggleTheme() {
		if (selected === 'light') {
			selected = 'dark';
		} else {
			selected = 'light';
		}
	}

	// Clear theme when button is double clicked.
	function clearTheme() {
		selected = 'system';
	}
</script>

<svelte:head>
	<!-- Prevent Chromium based browser from inverting the page. -->
	<meta name="color-scheme" content="light" />
	<!-- Prevent Dark Reader from inverting the page. -->
	<meta name="darkreader-lock" />
	<!-- Load theme before body starts rendering. -->
	<script>
		const selected = localStorage.getItem('theme') ?? 'system';
		const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		const theme = selected === 'system' ? system : selected;
		if (theme === 'dark') document.documentElement.classList.add('dark');
		else document.documentElement.classList.add('light');
	</script>
</svelte:head>

<button
	aria-label="Toggle theme"
	class:hidden={!browser}
	class="absolute top-0 right-0 md:p-4"
	onclick={toggleTheme}
	ondblclick={clearTheme}
>
	<div class="size-10 object-cover hover:scale-110 duration-300 ease-in-out">
		<svg
			class="hidden dark:block stroke-hearchco-secondary"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			<path
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.657-5.657L19.07 4.93M4.93 19.07l1.414-1.414m0-11.314L4.93 4.93m14.14 14.14l-1.414-1.414M12 17a5 5 0 1 0 0-10a5 5 0 0 0 0 10"
			/>
		</svg>
		<svg
			class="block dark:hidden stroke-hearchco-primary"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			<path
				fill="none"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9.874 5.008c2.728-1.68 6.604-1.014 8.25.197c-2.955.84-5.11 3.267-5.242 6.415c-.18 4.28 3.006 6.588 5.24 7.152c-1.964 1.343-4.36 1.293-5.235 1.172c-3.568-.492-6.902-3.433-7.007-7.711c-.106-4.278 2.573-6.35 3.994-7.225z"
			/>
		</svg>
	</div>
</button>
