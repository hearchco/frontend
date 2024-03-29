export function createArbitraryUrl(
	uri: string,
	path: string,
	encode: boolean = false,
	params?: URLSearchParams
): URL {
	const urlString: string = (uri.endsWith('/') ? uri : uri + '/') + path;
	const urll: URL = new URL(urlString);

	if (params !== undefined) {
		for (const [key, value] of params) {
			urll.searchParams.set(key, encode ? encodeURIComponent(value) : value);
		}
	}

	return urll;
}
