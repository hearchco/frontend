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
	/** @type {number|undefined} */
	let beepingInterval = $state(undefined);

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
			clearInterval(beepingInterval);
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
			// This breaks the input fields.
			// case ' ':
			// 	event.preventDefault();
			// 	toggleState();
			// 	break;
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

<Beeper bind:beeping bind:beepingInterval />

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
					<!-- <svg
						class:hidden={beeping}
						class="text-gray-200 animate-pulse dark:text-gray-600 fill-blue-600"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg> -->
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
