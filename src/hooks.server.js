import { error } from '@sveltejs/kit';
import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ request, fetch }) {
	const privateApiUri = privateEnv.API_URI;
	if (!privateApiUri) {
		// Internal Server Error
		throw error(500, 'API_URI env is not defined');
	}

	const publicApiUri = publicEnv.PUBLIC_API_URI;
	if (!publicApiUri) {
		// Internal Server Error
		throw error(500, 'PUBLIC_API_URI env is not defined');
	}

	if (request.url.startsWith(publicApiUri)) {
		// clone the original request, but change the URL
		request = new Request(request.url.replace(publicApiUri, privateApiUri), request);
	}

	return fetch(request);
}
