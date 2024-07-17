/**
 * Returns the total number of seconds in the given hours, minutes, and seconds.
 * @param {number} hours
 * @param {number} minutes
 * @param {number} seconds
 * @returns {number}
 */
export function totalSeconds(hours, minutes, seconds) {
	return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Returns the hours, minutes, and seconds from the total number of seconds.
 * @param {number} totalSeconds
 * @returns {[number, number, number]}
 */
export function hmsFromTotal(totalSeconds) {
	const hours = Math.floor(totalSeconds / 3600) > 10 ? 10 : Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	return [hours, minutes, seconds];
}
