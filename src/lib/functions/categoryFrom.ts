import type { CategoryType } from '$lib/types/category';

export function categoryFrom(query: string): CategoryType {
	if (query.startsWith('!image')) {
		return 'IMAGE';
	} else {
		return 'GENERAL';
	}
}
