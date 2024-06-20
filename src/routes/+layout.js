import { PUBLIC_UI_VERSION } from '$env/static/public';
import { fetchVersion } from '$lib/functions/api/fetchversion';

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch }) {
	const apiVersion = await fetchVersion(fetch);
	return {
		uiVersion: PUBLIC_UI_VERSION ?? 'dev',
		apiVersion: apiVersion
	};
}
