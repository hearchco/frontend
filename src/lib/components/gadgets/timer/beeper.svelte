<script>
	import { sleep } from '$lib/functions/sleep/sleep';
	import { onMount } from 'svelte';

	/**
	 * @typedef {object} Props
	 * @property {boolean} beeping
	 */

	/** @type {Props} */
	let { beeping } = $props();

	/** @type {AudioContext|null} */
	let ctx = $state(null);

	onMount(() => {
		ctx = new window.AudioContext();
	});

	/**
	 * Get the frequency of a note.
	 * @param {number} note
	 * @returns {number}
	 */
	function getFrequency(note = 1) {
		switch (note) {
			case 1:
				return 659; // E5
			case 2:
				return 622; // D#5
			case 3:
				return 587; // D5
			case 4:
				return 523; // C5
			case 5:
				return 493; // B4
			case 6:
				return 466; // A#4
			case 7:
				return 440; // A4
			case 8:
				return 392; // G4
			case 9:
				return 349; // F4
			case 10:
				return 330; // E4
			case 11:
				return 294; // D4
			default:
				return 0; // Rest
		}
	}

	const noteDuration = 250;
	const notes = [
		4, 4, 4, 5, 6, 6, 6, 7, 8, 8, 8, 9, 10, 10, 10, 7, 4, 4, 4, 5, 6, 6, 6, 7, 8, 8, 8, 9, 10, 10,
		10, 7, 4, 4, 4, 5, 6, 6, 6, 7, 8, 8, 8, 9, 10, 10, 10, 7, 4, 4, 4, 5, 6, 6, 6, 7, 8, 8, 8, 9,
		10, 10, 10, 7
	];

	/**
	 * Beeps a sound
	 * @param {AudioContext} ctx
	 * @param {number} freq
	 * @param {number} vol
	 * @returns {void}
	 */
	function beep(ctx, freq, vol = 5) {
		const oscillator = ctx.createOscillator();
		const gain = ctx.createGain();
		oscillator.connect(gain);
		oscillator.frequency.value = freq;
		oscillator.type = 'square';
		gain.connect(ctx.destination);
		gain.gain.value = vol * 0.005;
		oscillator.start(ctx.currentTime);
		oscillator.stop(ctx.currentTime + noteDuration * 0.001);
	}

	/**
	 * Plays the timer sound
	 * @param {AudioContext} ctx
	 * @returns {Promise<void>}
	 */
	async function playTimerSound(ctx) {
		while (beeping) {
			for (const note of notes) {
				if (!beeping) return;
				await sleep(noteDuration);
				if (!beeping) return;
				beep(ctx, getFrequency(note));
			}
		}
	}

	$effect(() => {
		if (beeping && ctx) playTimerSound(ctx);
	});
</script>
