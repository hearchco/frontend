<script>
	import { hmsFromTotal, totalSeconds } from '$lib/functions/gadgets/timer';
	import { timeFromTimery } from '$lib/functions/query/gadgets/timer';
	import Beeper from './beeper.svelte';

	/**
	 * @typedef {object} Props
	 * @property {string} query
	 */

	/** @type {Props} */
	let { query } = $props();

	const [initHours, initMinutes, initSeconds] = timeFromTimery(query);

	let beeping = $state(false);

	/** @type {HTMLElement | null} */
	let timerNumbersContainer = $state(null);

	/**
	 * @param {number|null} h - Hours
	 * @param {number|null} m - Minutes
	 * @param {number|null} s - Seconds
	 * @returns {string} - Timer string in the format "hh:mm:ss"
	 */
	function timerString(h, m, s) {
		if (!h) h = 0;
		if (!m) m = 0;
		if (!s) s = 0;

		const hoursStr = h != 0 ? h.toString().padStart(2, '0').padEnd(3, ':') : '';
		const minutesStr = hoursStr != '' || m != 0 ? m.toString().padStart(2, '0').padEnd(3, ':') : '';
		const secondsStr = minutesStr != '' ? s.toString().padStart(2, '0') : s.toString();
		return `${hoursStr}${minutesStr}${secondsStr}`;
	}

	let hours = $state(initHours);
	$effect(() => {
		if (hours < 0) hours = 0;
		if (hours > 10) hours = 10;
	});
	let minutes = $state(initMinutes);
	$effect(() => {
		if (minutes < 0) minutes = 0;
		if (minutes > 59) {
			hours += Math.floor(minutes / 60);
			minutes = minutes % 60;
		}
	});
	let seconds = $state(initSeconds);
	$effect(() => {
		if (seconds < 0) seconds = 0;
		if (seconds > 59) {
			minutes += Math.floor(seconds / 60);
			seconds = seconds % 60;
		}
	});
	const remainingTime = $derived(timerString(hours, minutes, seconds));

	let editMode = $state(false);
	let active = $state(false);
	$effect(() => {
		if (active) {
			console.trace('effect: active -> editMode = false');
			editMode = false;
			beeping = false;
		}
	});
	$effect(() => {
		if (editMode) {
			console.trace('effect: editMode -> active = false; clearInterval(interval)');
			active = false;
			beeping = false;
			clearInterval(interval);
		}
	});

	/** @type {number|undefined} */
	let interval = $state(undefined);
	function toggleState() {
		if (beeping) {
			beeping = false;
			return;
		}

		active = !active;
		if (active) {
			let total = totalSeconds(hours, minutes, seconds);
			interval = setInterval(() => {
				if (total <= 0) {
					clearInterval(interval);
					active = false;
					beeping = true;
				} else {
					total--;
					[hours, minutes, seconds] = hmsFromTotal(total);
				}
			}, 1000);
		} else {
			clearInterval(interval);
			return undefined;
		}
	}

	// svelte-ignore state_referenced_locally
	let selectedHours = $state(hours);
	// svelte-ignore state_referenced_locally
	let selectedMinutes = $state(minutes);
	// svelte-ignore state_referenced_locally
	let selectedSeconds = $state(seconds);
	const selectedTime = $derived(timerString(selectedHours, selectedMinutes, selectedSeconds));
	$effect(() => {
		if (editMode) {
			console.trace('effect: editMode -> selectedHours = hours');
			selectedHours = hours;
		}
	});
	$effect(() => {
		if (editMode) {
			console.trace('effect: editMode -> selectedMinutes = minutes');
			selectedMinutes = minutes;
		}
	});
	$effect(() => {
		if (editMode) {
			console.trace('effect: editMode -> selectedSeconds = seconds');
			selectedSeconds = seconds;
		}
	});
</script>

<svelte:window
	onkeydown={(event) => {
		switch (event.key) {
			case 'Escape':
			case 'Enter':
				editMode = false;
				break;
		}
	}}
	onclick={({ target }) => {
		if (target && target instanceof HTMLElement) {
			if (timerNumbersContainer && !timerNumbersContainer.contains(target)) {
				editMode = false;
			}
		}
	}}
/>

<Beeper {beeping} />

<div class="mx-auto max-w-screen-sm">
	<div class="mx-2 mt-2 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl">
		<div class="mx-2 flex items-center space-x-2">
			<span>Timer</span>
			<div class="size-2 bg-neutral-300 dark:bg-neutral-500 rounded-full"></div>
			<span>{selectedTime}</span>
		</div>
		<div class="m-4 flex items-center">
			<div
				class="size-16 2xs:size-20 xs:size-24 sm:size-32 flex shrink-0 items-center justify-center border-4 border-neutral-200 dark:border-neutral-600 rounded-full"
			>
				<button
					onclick={toggleState}
					class="size-1/3 text-neutral-200 dark:text-neutral-600 hover:text-neutral-400"
				>
					<svg
						class:hidden={active || beeping}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path d="M8 5v14l11-7z" />
					</svg>
					<svg
						class:animate-pulse={beeping}
						class:hidden={!(active || beeping)}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
					</svg>
				</button>
			</div>
			<div bind:this={timerNumbersContainer}>
				<button
					onclick={() => (editMode = true)}
					class:hidden={editMode}
					class="px-6 sm:px-10 text-3xl hover:underline"
				>
					{remainingTime}
				</button>
				<div class:hidden={!editMode} class="mx-6 sm:mx-10 flex space-x-2">
					<label for="hoursInput">
						<input
							class="w-5 bg-transparent focus:outline-none"
							id="hoursInput"
							autocomplete="off"
							type="number"
							min={0}
							max={10}
							placeholder="0"
							bind:value={hours}
						/>
						h
					</label>
					<label for="minutesInput">
						<input
							class="w-5 bg-transparent focus:outline-none"
							id="minutesInput"
							autocomplete="off"
							type="number"
							min={0}
							max={59}
							placeholder="0"
							bind:value={minutes}
						/>
						m
					</label>
					<label for="secondsInput">
						<input
							class="w-5 bg-transparent focus:outline-none"
							autocomplete="off"
							id="secondsInput"
							type="number"
							min={0}
							max={59}
							placeholder="0"
							bind:value={seconds}
						/>
						s
					</label>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Custom styles to hide number input arrows */
	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type='number'] {
		appearance: textfield;
		-moz-appearance: textfield; /* Firefox */
	}
</style>
