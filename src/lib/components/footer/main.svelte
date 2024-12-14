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
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						fill-rule="evenodd"
						d="M11.999 1C5.926 1 1 5.925 1 12c0 4.86 3.152 8.983 7.523 10.437c.55.102.75-.238.75-.53c0-.26-.009-.952-.014-1.87c-3.06.664-3.706-1.475-3.706-1.475c-.5-1.27-1.221-1.61-1.221-1.61c-.999-.681.075-.668.075-.668c1.105.078 1.685 1.134 1.685 1.134c.981 1.68 2.575 1.195 3.202.914c.1-.71.384-1.195.698-1.47c-2.442-.278-5.01-1.222-5.01-5.437c0-1.2.428-2.183 1.132-2.952c-.114-.278-.491-1.397.108-2.91c0 0 .923-.297 3.025 1.127A10.5 10.5 0 0 1 12 6.32a10.5 10.5 0 0 1 2.754.37c2.1-1.424 3.022-1.128 3.022-1.128c.6 1.514.223 2.633.11 2.911c.705.769 1.13 1.751 1.13 2.952c0 4.226-2.572 5.156-5.022 5.428c.395.34.747 1.01.747 2.037c0 1.47-.014 2.657-.014 3.017c0 .295.199.637.756.53C19.851 20.979 23 16.859 23 12c0-6.075-4.926-11-11.001-11"
					/>
				</svg>
			</a>

			<!-- Uptime Symbolic Icon -->
			<a
				href="https://status.hearch.co"
				class="text-hearchco-primary dark:text-hearchco-secondary hover:opacity-75"
				aria-label="Uptime Status Page"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M13 7a1 1 0 1 0-2 0v5a1 1 0 0 0 .4.8l4 3a1 1 0 0 0 1.2-1.6L13 11.5z"
					/>
					<path
						fill="currentColor"
						fill-rule="evenodd"
						d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12a9 9 0 1 1 18 0a9 9 0 0 1-18 0"
						clip-rule="evenodd"
					/>
				</svg>
			</a>
		</div>
		<p class="text-sm text-neutral-600 dark:text-neutral-300 font-light">
			UI: {uiVersion} | Agent: {apiVersion}
		</p>
	</div>
</footer>
