<script lang="ts">
	const widths = [64, 80];
	// pick a random width from widths
	const width = widths[Math.floor(Math.random() * widths.length)];
</script>

<div class="animate-pulse">
	<div class="h-full w-full overflow-hidden rounded-lg bg-gray-300 dark:bg-gray-700">
		<div class="h-48 w-{width}"></div>
		<!-- Image loading skeleton -->
	</div>
</div>
