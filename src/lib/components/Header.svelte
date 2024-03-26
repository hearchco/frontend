<script lang="ts">
	// components
	import Searchbox from '$lib/components/Searchbox.svelte';

	// parameters
	export let query: string;
</script>

<header
	class="flex flex-col justify-end h-36 items-center border-b-2 border-gray-100 dark:border-zinc-700"
>
	<div class="px-4 w-full min-w-fit">
		<div class="md:mx-auto flex max-w-screen-md items-center">
			<Searchbox categories={true} bind:query />
		</div>
	</div>
</header>
