<script>
	import '../app.css';
	import Footer from '$lib/components/footer/main.svelte';
</script>

<main class="min-h-[90dvh]">
	<!-- eslint-disable-next-line svelte/no-unused-svelte-ignore -->
	<!-- svelte-ignore slot_element_deprecated -->
	<slot />
</main>
<Footer />
