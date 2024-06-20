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
		<a
			class="text-hearchco-primary dark:text-hearchco-secondary font-bold hover:underline"
			href="https://github.com/hearchco"
		>
			Source code
		</a>
		<p class="text-sm text-neutral-600 dark:text-neutral-300 font-light">
			UI ver: {uiVersion} | Agent ver: {apiVersion.replace(/;$/, '')}
		</p>
	</div>
</footer>
