<script>
	import '../app.css';

	import Footer from '$lib/components/footer/main.svelte';
</script>

<!-- svelte-ignore slot_element_deprecated -->
<main class="min-h-[90dvh]">
	<slot />
</main>
<Footer />
