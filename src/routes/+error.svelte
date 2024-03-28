<script lang="ts">
	// components
	import Error from '$lib/components/Error.svelte';
</script>

<svelte:head><title>Not Found | Hearchco</title></svelte:head>

<Error statusCode={'404'} message={'There is nothing to be hearched here.'} />
