<script lang="ts">
	const widths = [115, 150, 167];
	const w = widths[Math.floor(Math.random() * widths.length)];
</script>

<div class="animate-pulse">
	<div class="h-full w-full overflow-hidden rounded-lg bg-gray-300 dark:bg-gray-700">
		<div class="h-48 w-[{w}px]"></div>
		<!-- Image loading skeleton -->
	</div>
</div>
