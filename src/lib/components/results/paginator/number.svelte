<script>
	/**
	 * @typedef {object} Props
	 * @property {number} page
	 * @property {boolean} [selected]
	 */

	/** @type {Props} */
	let { page, selected = false } = $props();
</script>

<div
	class:ring-2={selected}
	class:ring-hearchco-primary={selected}
	class:dark:ring-hearchco-secondary={selected}
	class:bg-neutral-100={selected}
	class:dark:bg-neutral-700={selected}
	class:dark:bg-neutral-800={!selected}
	class:hover:bg-neutral-100={!selected}
	class:hover:dark:bg-neutral-700={!selected}
	class:hover:ring-2={!selected}
	class:hover:ring-hearchco-primary={!selected}
	class:hover:dark:ring-hearchco-secondary={!selected}
	class="mx-1 rounded-lg shadow-lg overflow-hidden text-neutral-500 dark:text-neutral-200 hover:text-hearchco-primary hover:dark:text-hearchco-secondary border border-neutral-100 dark:border-0 duration-200 ease-in-out"
>
	<button type="submit" class="size-8" name="start" value={page}>
		{page}
	</button>
</div>
