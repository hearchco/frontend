<script lang="ts">
	export let number: number;
</script>

<div class="sm:mx-auto mb-4 max-w-screen-sm">
	<div class="mx-2 my-4 overflow-clip pointer-events-none">
		{#each { length: number } as _}
			<div class="w-full animate-pulse">
				<div
					class="w-max-content min-[292px]:w-[292px] h-[20px] bg-gray-800 dark:bg-gray-400 rounded-full"
				></div>
				<div
					class="my-0.5 w-max-content min-[230px]:w-[218px] h-[28px] hearchco-bg-primary rounded-lg"
				></div>
				<div
					class="my-0.5 w-max-content sm:w-[620px] h-10 text-sm bg-gray-600 dark:bg-gray-200 rounded-lg"
				></div>
				<div class="my-2 flex justify-end rounded-lg">
					<div class="w-[115px] h-[15px] bg-gray-800 dark:bg-gray-400 rounded-lg"></div>
				</div>
			</div>
			<hr class="my-2 border border-gray-200 dark:border-gray-600" />
		{/each}
	</div>
</div>
