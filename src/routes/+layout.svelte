<script>
	// css
	import '../app.css';

	// components
	import Footer from '$lib/components/Footer.svelte';
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
</script>

<DarkModeToggle />
<slot />
<Footer />
