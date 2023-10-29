<script>
	import Searchbox from '$lib/components/Searchbox.svelte';
</script>

<svelte:head><title>Search | BrzaGuza</title></svelte:head>

<!-- Header section -->
<header
	class="custom-bg-headfoot dark:custom-bg-headfoot flex h-36 items-center border border-gray-100 dark:border-0"
>
	<div class="mx-4 w-full min-w-fit">
		<div class="mx-auto flex max-w-screen-md items-center">
			<a href="/">
				<img class="h-auto w-20" src="/img/brzaguza.svg" alt="" />
			</a>
			<Searchbox />
			<div class="w-0 sm:w-20" />
		</div>
	</div>
</header>
<div class="mx-auto mb-4 max-w-screen-sm">
	<div id="result-list" class="mx-2 my-4 max-w-fit overflow-clip">
		<div>
			<article id="result">
				<a id="link" href="https://brzaguza.rs" class="dark:text-white" rel="noreferrer"
					>https://brzaguza.rs</a
				>
				<h1 id="title" class="brzaguza-text-blue hover:brzaguza-text-pink text-xl hover:underline">
					<a href="https://brzaguza.rs" rel="noreferrer">BrzaGuza - Metasearch engine</a>
				</h1>
				<p id="description" class="my-1 text-justify text-sm text-gray-600 dark:text-gray-200">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
					sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum.
				</p>
				<div id="engines" class="my-2 text-right text-xs text-gray-800 dark:text-gray-400">
					<span class="mx-0.5">BrzaGuza</span>
					<span class="mx-0.5">BrzaGuza</span>
					<span class="mx-0.5">BrzaGuza</span>
				</div>
			</article>
			<hr class="my-2 border border-gray-200 dark:border-gray-600" />
		</div>
		<div>
			<article id="result">
				<a id="link" href="https://brzaguza.rs" class="dark:text-white" rel="noreferrer"
					>https://brzaguza.rs</a
				>
				<h1 id="title" class="brzaguza-text-blue hover:brzaguza-text-pink text-xl hover:underline">
					<a href="https://brzaguza.rs" rel="noreferrer">BrzaGuza - Metasearch engine</a>
				</h1>
				<p id="description" class="my-1 text-justify text-sm text-gray-600 dark:text-gray-200">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
					sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum.
				</p>
				<div id="engines" class="my-2 text-right text-xs text-gray-800 dark:text-gray-400">
					<span class="mx-0.5">BrzaGuza</span>
					<span class="mx-0.5">BrzaGuza</span>
					<span class="mx-0.5">BrzaGuza</span>
				</div>
			</article>
			<hr class="my-2 border border-gray-200 dark:border-gray-600" />
		</div>
		<div>
			<article id="result">
				<a id="link" href="https://brzaguza.rs" class="dark:text-white" rel="noreferrer"
					>https://brzaguza.rs</a
				>
				<h1 id="title" class="brzaguza-text-blue hover:brzaguza-text-pink text-xl hover:underline">
					<a href="https://brzaguza.rs" rel="noreferrer">BrzaGuza - Metasearch engine</a>
				</h1>
				<p id="description" class="my-1 text-justify text-sm text-gray-600 dark:text-gray-200">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
					sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum.
				</p>
				<div id="engines" class="my-2 text-right text-xs text-gray-800 dark:text-gray-400">
					<span class="mx-0.5">BrzaGuza</span>
					<span class="mx-0.5">BrzaGuza</span>
					<span class="mx-0.5">BrzaGuza</span>
				</div>
			</article>
			<hr class="my-2 border border-gray-200 dark:border-gray-600" />
		</div>
	</div>
</div>
