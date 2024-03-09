<script lang="ts">
	// types
	import type { Width } from '$lib/types/width';

	// parameters
	export let colored: boolean = false;
	export let width: Width = 64;
</script>

<div class="animate-pulse">
	<div
		class:bg-hearchco-primary={colored}
		class:bg-gray-300={!colored}
		class:dark:bg-gray-700={!colored}
		class="h-full w-full overflow-hidden rounded-lg"
	>
		<div class="h-48 w-{width} object-cover"></div>
	</div>
</div>
