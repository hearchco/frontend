import { fetchVersion } from '$lib/functions/api/fetchversion';

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch }) {
	const apiVersion = await fetchVersion(fetch);
	return {
		apiVersion: apiVersion
	};
}
