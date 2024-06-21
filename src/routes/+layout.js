import { PUBLIC_UI_VERSION } from '$env/static/public';
import { fetchVersion } from '$lib/functions/api/fetchversion';

/**
 * @param {string} input
 * @returns {string | null}
 */
function extractVersion(input) {
	// Regular expression to match the version part
	const versionRegex = /^v\d+\.\d+\.\d+/;
	const match = input.match(versionRegex);

	// Return the matched version or null if not found
	return match ? match[0] : null;
}

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch }) {
	const apiVersion = await fetchVersion(fetch);
	return {
		uiVersion: PUBLIC_UI_VERSION ?? 'dev',
		apiVersion: extractVersion(apiVersion) ?? 'dev'
	};
}
