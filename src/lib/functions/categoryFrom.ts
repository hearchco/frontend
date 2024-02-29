import { CategoryEnum } from '$lib/types/category';

export function categoryFrom(query: string): string {
	let cat = 'general';

	Object.values(CategoryEnum).some((category) => {
		if (query.startsWith('!' + category)) {
			cat = category;
		}
	});

	return cat;
}

export function hasCategory(query: string): boolean {
	return Object.values(CategoryEnum).some((category) => query.startsWith('!' + category));
}

export function categoryEquals(query: string, category: string): boolean {
	return category == categoryFrom(query);
}
