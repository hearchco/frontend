<script lang="ts">
	// assets
	import Logo from '$lib/assets/logo.svg';

	// parameters
	export let statusCode: string;
	export let message: string;
	export let err: Error | undefined;
</script>

<!-- this is hard fixed top space -->
<div class="mx-auto mb-4 mt-20 max-w-screen-sm">
	<div class="text-center w-full">
		<h1
			class="mb-4 text-7xl lg:text-8xl xl:text-9xl font-black capitalize tracking-tight dark:text-white"
		>
			{statusCode}
		</h1>

		<p
			class="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
		>
			{err !== undefined ? err.message : message}
		</p>

		<a href="/" class="mx-auto w-fit flex items-center">
			<img class="mr-2 h-20 w-20 animate-spin" src={Logo} alt="logo" />
			<p class="hover:text-hearchco-primary italic dark:text-white">Go back to homepage</p>
			<img class="ml-2 h-20 w-20 animate-spin" src={Logo} alt="logo" />
		</a>
	</div>
</div>
