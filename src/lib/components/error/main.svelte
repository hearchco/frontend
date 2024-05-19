<script>
	import Logo from '$lib/assets/logo.svg';

	/**
	 * @typedef {object} Props
	 * @property {number} status
	 * @property {string} [message]
	 * @property {string} [error]
	 */

	/** @type {Props} */
	let { status, message, error } = $props();
</script>

<div class="pt-40 mx-auto text-center">
	<h1 class="py-2 text-6xl sm:text-9xl font-black tracking-tight">
		{status}
	</h1>
	<p
		class="py-4 text-md sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
	>
		{error ?? message ?? 'An error occurred.'}
	</p>
	<a href="/" class="py-2 flex place-content-center items-center">
		<img
			class="max-2xs:hidden size-20 -rotate-12 transform -scale-x-100"
			src={Logo}
			alt="Hearchco Mirrored"
		/>
		<p class="px-3 text-xl italic hover:text-hearchco-primary hover:dark:text-hearchco-secondary">
			Go back to homepage
		</p>
		<img class="max-2xs:hidden size-20 rotate-12" src={Logo} alt="Hearchco" />
	</a>
</div>
