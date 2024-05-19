/**
 * @param {number} duration - The duration to sleep in milliseconds
 * @returns {Promise<void>} - A promise that resolves after the duration
 */
export async function sleep(duration) {
	await new Promise((r) => setTimeout(r, duration));
}
