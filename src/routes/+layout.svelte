<script>
	import '../app.css';
	import Preconnect from '$lib/components/preconnect/main.svelte';
	import ThemeToggle from '$lib/components/themetoggle/main.svelte';
	import Footer from '$lib/components/footer/main.svelte';

	let { data } = $props();
	const browser = $derived(data.browser);
	const uiVersion = $derived(data.uiVersion);
	const apiVersion = $derived(data.apiVersion);
</script>

<Preconnect />

<ThemeToggle {browser} />

<main class="min-h-[90lvh]">
	<!-- eslint-disable-next-line svelte/no-unused-svelte-ignore -->
	<!-- svelte-ignore slot_element_deprecated -->
	<slot />
</main>

<Footer {uiVersion} {apiVersion} />
