<script lang="ts">
	// css
	import '../app.css';

	// components
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<script type="text/javascript">
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>
</svelte:head>

<DarkModeToggle />
<slot />
<Footer />
