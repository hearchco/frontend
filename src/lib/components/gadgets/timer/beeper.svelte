<script>
	import { sleep } from '$lib/functions/sleep/sleep';

	/**
	 * @typedef {object} Props
	 * @property {boolean} beeping
	 * @property {number|undefined} beepingInterval
	 */

	/** @type {Props} */
	let { beeping = $bindable(), beepingInterval = $bindable() } = $props();

	/**
	 * Get the frequency of a note.
	 * @param {number} note
	 * @returns {number}
	 */
	function getFrequency(note = 1) {
		switch (note) {
			case 4:
				return 440;
			case 6:
				return 392;
			case 8:
				return 349;
			case 9:
				return 330;
			case 11:
				return 294;
			case 13:
				return 262;
			case 14:
				return 247;
			case 15:
				return 233;
			case 16:
				return 220;
			case 18:
				return 196;
			case 21:
				return 165;
			default:
				return 0;
		}
	}

	const marioNotes = [
		9, 9, 0, 9, 0, 13, 9, 0, 6, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 18, 0, 0, 21, 0, 0, 16, 0, 14, 0, 15,
		16, 0, 18, 9, 6, 4, 0, 8, 6, 0, 8, 6, 0, 9, 0, 13, 11, 13
	];

	/**
	 * Beeps a sound
	 * @param {AudioContext} ctx
	 * @param {number} freq
	 * @param {number} duration
	 * @param {number} vol
	 * @returns {void}
	 */
	function beep(ctx, freq = 520, duration = 200, vol = 100) {
		const oscillator = ctx.createOscillator();
		const gain = ctx.createGain();
		oscillator.connect(gain);
		oscillator.frequency.value = freq;
		oscillator.type = 'square';
		gain.connect(ctx.destination);
		gain.gain.value = vol * 0.01;
		oscillator.start(ctx.currentTime);
		oscillator.stop(ctx.currentTime + duration * 0.001);
	}

	/** @returns {Promise<void>} */
	async function playTimerSound() {
		const ctx = new window.AudioContext();
		for (const note of marioNotes) {
			await sleep(200);
			beep(ctx, getFrequency(note));
		}
	}

	/** @returns {void} */
	function startBeeping() {
		playTimerSound();
		beepingInterval = setInterval(playTimerSound, 200 * marioNotes.length);
	}

	$effect(() => {
		if (beeping) {
			startBeeping();
		}
	});
</script>
