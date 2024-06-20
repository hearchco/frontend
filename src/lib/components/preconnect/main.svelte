<script>
	import { createApiUrl } from '$lib/functions/api/createurl';

	const apiUrlStr = createApiUrl().toString().replace(/\/$/, '');
</script>

<svelte:head>
	<link rel="dns-prefetch" href={apiUrlStr} crossorigin="anonymous" />
	<link rel="preconnect" href={apiUrlStr} crossorigin="anonymous" />
</svelte:head>
