<script lang="ts">
	export let query = '';
</script>

<form
	class="custom-bg-button dark:custom-bg-button flex h-12 w-full rounded-full border border-gray-100 shadow-2xl dark:border-0 dark:text-white"
	method="get"
	action="/search"
	on:submit
>
	<input
		name="q"
		class="mx-4 h-full w-full bg-transparent focus:outline-none"
		type="text"
		placeholder="Hearch..."
		autocomplete="off"
		autocapitalize="none"
		spellcheck="false"
		autocorrect="off"
		dir="auto"
		bind:value={query}
	/>
	<!-- <button
            class="hearchco-text-primary hover:hearchco-text-primary h-full w-8 rounded-full bg-transparent"
          >
            <svg
              class="h-1/2 w-full bg-transparent"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M368 368L144 144M368 144L144 368"
              ></path>
            </svg>
          </button> -->
	<button
		type="submit"
		class="hearchco-text-primary hover:hearchco-bg-secondary h-full w-20 rounded-full bg-transparent"
	>
		<svg class="mx-auto h-1/2 w-full bg-transparent" viewBox="0 0 512 512" aria-hidden="true">
			<path
				d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
				fill="none"
				stroke="currentColor"
				stroke-miterlimit="10"
				stroke-width="32"
			/>
			<path
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-miterlimit="10"
				stroke-width="32"
				d="M338.29 338.29L448 448"
			/>
		</svg>
	</button>
</form>
