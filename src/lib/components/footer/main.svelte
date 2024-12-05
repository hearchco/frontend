<script>
	/**
	 * @typedef {object} Props
	 * @property {string} uiVersion
	 * @property {string} apiVersion
	 */

	/** @type {Props} */
	let { uiVersion, apiVersion } = $props();
</script>

<footer class="h-[10lvh] w-full border-t-2 border-neutral-100 dark:border-neutral-700">
	<div class="h-full flex flex-col place-content-center items-center">
		<div class="py-2 flex flex-row justify-center items-center space-x-4">
			<!-- GitHub Icon -->
			<a
				href="https://github.com/hearchco"
				class="text-hearchco-primary dark:text-hearchco-secondary hover:opacity-75"
				aria-label="GitHub Repository"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="size-6"
				>
					<path
						d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.997.108-.774.418-1.305.76-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.47-2.38 1.236-3.22-.124-.304-.535-1.527.117-3.176 0 0 1.007-.322 3.3 1.23.957-.267 1.983-.4 3.003-.405 1.02.005 2.047.138 3.006.405 2.29-1.553 3.295-1.23 3.295-1.23.653 1.649.242 2.872.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.623-5.48 5.92.43.372.823 1.103.823 2.222 0 1.605-.015 2.897-.015 3.293 0 .32.217.694.825.577C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z"
					/>
				</svg>
			</a>

			<!-- Uptime Symbolic Icon -->
			<a
				href="https://status.hearch.co"
				class="text-hearchco-primary dark:text-hearchco-secondary hover:opacity-75"
				aria-label="Uptime Status Page"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="1 1 22 22"
					fill="currentColor"
					class="size-6"
				>
					<path
						d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-.5-13a1 1 0 00-1 1v5a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L12.5 12.586V8a1 1 0 00-1-1z"
					/>
				</svg>
			</a>
		</div>
		<p class="text-sm text-neutral-600 dark:text-neutral-300 font-light">
			UI ver: {uiVersion} | Agent ver: {apiVersion}
		</p>
	</div>
</footer>
