import { CategoryEnum } from '$lib/types/category';

export function categoryFrom(query: string): string | undefined {
	for (const category in CategoryEnum) {
		if (query.startsWith(`!${category}`)) {
			return category;
		}
	}
	return undefined;
}

export function categoryEquals(query: string, category: string): boolean {
	return category == categoryFrom(query);
}
