export function createArbitraryUrl(uri: string, path: string, params?: URLSearchParams): URL {
	const urlString: string = (uri.endsWith('/') ? uri : uri + '/') + path;
	const urll: URL = new URL(urlString);

	if (params !== undefined) {
		for (const [key, value] of params) {
			urll.searchParams.set(key, value);
		}
	}

	return urll;
}

export function encodeUrlParams(url: URL): URL {
	const encodedUrl: URL = new URL(url.toString());

	for (const [key, value] of encodedUrl.searchParams) {
		encodedUrl.searchParams.set(key, encodeURIComponent(value));
	}

	return encodedUrl;
}
