<script>
	import '../app.css';
	import ThemeToggle from '$lib/components/themetoggle/main.svelte';
	import Footer from '$lib/components/footer/main.svelte';
</script>

<ThemeToggle />

<main class="min-h-[90lvh]">
	<!-- eslint-disable-next-line svelte/no-unused-svelte-ignore -->
	<!-- svelte-ignore slot_element_deprecated -->
	<slot />
</main>

<Footer />
