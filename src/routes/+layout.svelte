<script lang="ts">
	// css
	import '../app.css';

	// components
	import { ModeWatcher } from 'mode-watcher';
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<ModeWatcher />
<DarkModeToggle />
<slot />
<Footer />
