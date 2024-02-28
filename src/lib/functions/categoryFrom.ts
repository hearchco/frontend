import { CategoryEnum } from '$lib/types/category';

export function categoryFrom(query: string): string | undefined {
	let gottenCategory: string = 'general';

	Object.values(CategoryEnum).some((category) => {
		if (query.startsWith('!' + category)) {
			gottenCategory = category;
		}
	});

	return gottenCategory;
}

export function hasCategory(query: string): boolean {
	return Object.values(CategoryEnum).some((category) => query.startsWith('!' + category));
}

export function categoryEquals(query: string, category: string): boolean {
	return category == categoryFrom(query);
}
