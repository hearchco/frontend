<script>
	import Logo from '$lib/assets/logo.svg';

	/**
	 * @typedef {object} Props
	 * @property {ResultType} result
	 */

	/** @type {Props} */
	let { result } = $props();

	/**
	 * @param {string} urll
	 * @returns {string}
	 */
	function getOriginUrl(urll) {
		// match only a single '/'
		/** @type {RegExp} */
		const pattern = RegExp('(?<!/)/(?!/)');
		return urll.split(pattern, 1)[0];
	}

	/**
	 * @param {string} urll
	 * @returns {string}
	 */
	function getFaviconUrl(urll) {
		return `${getOriginUrl(urll)}/favicon.ico`;
	}

	const shortDesc =
		result.description.length > 500 ? result.description.slice(0, 497) + '...' : result.description;

	let fullDesc = $state(false);
	function toggleDesc() {
		fullDesc = !fullDesc;
	}

	let currentDesc = $derived(fullDesc ? result.description : shortDesc);
</script>

<article id="result-{result.rank}" class="pt-2 break-words">
	<a id="link-{result.rank}" href={result.url} rel="noreferrer">
		{result.url}
	</a>
	<a class="flex" href={result.url} rel="noreferrer">
		<div
			class="max-5xs:hidden max-xs:mt-1.5 max-xs:mr-1 max-xs:min-w-4 max-xs:min-h-4 max-xs:size-4 mt-1 mr-1.5 min-w-5 min-h-5 size-5 dark:bg-neutral-700 rounded-md"
		>
			<object
				class="size-full object-contain"
				data={getFaviconUrl(result.url)}
				type="image/x-icon"
				title={result.title}
			>
				<img class="size-full object-contain" src={Logo} alt="" />
			</object>
		</div>
		<h1
			id="title-{result.rank}"
			class="text-xl text-hearchco-primary dark:text-hearchco-secondary hover:underline"
		>
			{result.title}
		</h1>
	</a>
	{#if shortDesc.length < result.description.length}
		<div class="flex place-content-end">
			<button onclick={toggleDesc}>
				<svg
					class="h-auto w-6"
					width="100"
					height="40"
					viewBox="0 0 100 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect width="100" height="40" rx="8" ry="8" fill="#4D4D4D" />
					<circle cx="20" cy="20" r="4" fill="#D3D3D3" />
					<circle cx="50" cy="20" r="4" fill="#D3D3D3" />
					<circle cx="80" cy="20" r="4" fill="#D3D3D3" />
				</svg>
			</button>
		</div>
	{/if}
	<p
		id="description-{result.rank}"
		class="py-1 text-justify text-sm text-neutral-600 dark:text-neutral-200"
	>
		{currentDesc}
	</p>
	<div
		id="engines-{result.rank}"
		class="pb-2 text-right text-xs text-neutral-800 dark:text-neutral-400"
	>
		{#each result.engine_ranks as er (er.search_engine)}
			<span class="mx-0.5">{er.search_engine}</span>
		{/each}
	</div>
</article>
