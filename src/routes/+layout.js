import { browser } from '$app/environment';
import { PUBLIC_UI_VERSION as uiVersion } from '$env/static/public';
import { fetchVersion } from '$lib/functions/api/fetchapiversion';

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch }) {
	const apiVersion = await fetchVersion(fetch);
	return {
		browser: browser,
		uiVersion: extractVersion(uiVersion) ?? 'dev',
		apiVersion: extractVersion(apiVersion) ?? 'dev'
	};
}

/**
 * @param {string} input
 * @returns {string | null}
 */
function extractVersion(input) {
	// Regular expression to match the version part
	const versionRegex = /v\d+\.\d+\.\d+(-preview)?/;
	const match = input.match(versionRegex);

	// Return the matched version or null if not found
	return match ? match[0] : null;
}
