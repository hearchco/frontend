/**
 * Convert any object to it's JSON.stringify() representation and then Base64 encode it.
 * @param {object} obj - The object to encode.
 * @returns {string} The Base64 encoded object.
 */
export function objectToBase64(obj) {
	// Detect whether running in Node.js or browser
	if (typeof window === 'undefined') {
		// Node.js
		return Buffer.from(JSON.stringify(obj)).toString('base64');
	} else {
		// Browser
		return btoa(JSON.stringify(obj));
	}
}
