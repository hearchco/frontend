<script lang="ts">
	// parameters
	export let colored: boolean = false;
</script>

<div class="animate-pulse">
	<div
		class:bg-hearchco-primary={colored}
		class:dark:bg-hearchco-secondary={colored}
		class:bg-gray-300={!colored}
		class:dark:bg-gray-700={!colored}
		class="h-full w-full overflow-hidden rounded-lg"
	>
		<div class="h-48 object-cover"></div>
	</div>
</div>
