<script>
	import Logo from '$lib/assets/logo.svg';
</script>

<div class="pt-40 flex place-content-center items-center">
	<a aria-label="Homepage" href="/" class="px-2 mr-5 hidden sm:block">
		<img src={Logo} alt="Hearchco Logo" class="size-20 -rotate-12 tranform -scale-x-100" />
	</a>
	<div class="text-center">
		<h1 class="py-2 text-2xl sm:text-3xl">
			Hearchco didn't find any results for your query. Please try again.
		</h1>
		<p class="py-2 text-lg sm:text-xl">
			If you think this is a mistake, please contact us by either opening a <a
				href="https://github.com/hearchco"
				class="underline text-hearchco-primary dark:text-hearchco-secondary">Github issue</a
			>
			or sending us an
			<a
				href="mailto://support@hearch.co"
				class="underline text-hearchco-primary dark:text-hearchco-secondary">email</a
			>.
		</p>
	</div>
	<a aria-label="Homepage" href="/" class="px-2 ml-5 hidden sm:block">
		<img src={Logo} alt="Hearchco Logo" class="size-20 rotate-12" />
	</a>
</div>
