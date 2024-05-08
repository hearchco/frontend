/**
 * Enum for category types.
 * @enum {string}
 * @readonly
 */
export const CategoryEnum = {
	GENERAL: 'general',
	IMAGES: 'images',
	INFO: 'info',
	SCIENCE: 'science',
	NEWS: 'news',
	BLOG: 'blog',
	SURF: 'surf',
	NEWNEWS: 'newnews'
};

/**
 * Enum for user visible category types.
 * @enum {string}
 * @readonly
 */
export const VisibleCategoryEnum = {
	GENERAL: CategoryEnum.GENERAL,
	IMAGES: CategoryEnum.IMAGES
};

/**
 * Converts a category to a user visible category.
 * @param {CategoryEnum} category
 * @returns {VisibleCategoryEnum}
 */
export function convertCategoryToVisible(category) {
	switch (category) {
		case CategoryEnum.IMAGES:
			return VisibleCategoryEnum.IMAGES;
		default:
			return VisibleCategoryEnum.GENERAL;
	}
}
