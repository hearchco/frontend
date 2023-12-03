<script lang="ts">
	import Error from '$lib/components/Error.svelte';
</script>

<svelte:head><title>API Error | Hearchco</title></svelte:head>

<Error statusCode={'500'} message={'Hearchco API failed.'} />
