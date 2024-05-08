<script>
	import { page } from '$app/stores';
	import Error from '$lib/components/error/main.svelte';
</script>

<svelte:head><title>API Error | Hearchco</title></svelte:head>

<Error status={$page.status} message={'Hearchco API failed.'} error={$page.error?.message} />
