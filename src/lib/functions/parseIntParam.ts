export function parseIntParam(url: URL, param: string, fallback: number): number {
	const value: string | null = url.searchParams.get(param);
	if (value === null) {
		return fallback;
	}

	const parsed: number = parseInt(value, 10);
	if (isNaN(parsed)) {
		return fallback;
	}

	return parsed;
}
