import { env } from '$env/dynamic/public';
import { browser } from '$app/environment';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	const q = url.searchParams.get('q');
	if (q === null || q === '') {
		return {
			query: '',
			results: []
		};
	}

	let apiUri;
	if (!browser) {
		apiUri = env.PUBLIC_API_URL_SSR;
	} else {
		apiUri = env.PUBLIC_API_URL_CSR;
	}
	const apiUrl = `${apiUri}/search?${url.searchParams}`;

	// it's important to use the included fetch so that the fetch is not run again in the browser
	const resultsP = new Promise((resolve, reject) => {
		fetch(apiUrl)
			.then((res) => {
				resolve(res.json());
			})
			.catch((err) => {
				reject(err);
			});
	});

	return {
		query: q,
		results: browser ? resultsP : await resultsP
	};
};
