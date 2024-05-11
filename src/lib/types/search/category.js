/**
 * Enum for category types.
 * @enum {string}
 * @readonly
 */
export const CategoryEnum = {
	GENERAL: 'general',
	IMAGES: 'images',
	QUICK: 'quick',
	SCIENCE: 'science',
	BROAD: 'broad'
};

/**
 * Converts a string to a category type if possible.
 * @param {string} category - The category to convert.
 * @returns {CategoryEnum | undefined} The category type.
 */
export function toCategoryType(category) {
	switch (category) {
		case 'general':
			return CategoryEnum.GENERAL;
		case 'images':
			return CategoryEnum.IMAGES;
		case 'quick' || 'fast':
			return CategoryEnum.QUICK;
		case 'science' || 'sci':
			return CategoryEnum.SCIENCE;
		case 'broad' || 'surf':
			return CategoryEnum.BROAD;
		default:
			return undefined;
	}
}

/**
 * Returns the category to be used for UI display.
 * @param {CategoryEnum} category - The category to convert.
 * @returns {CategoryEnum} The category to display.
 */
export function toDisplayCategory(category) {
	switch (category) {
		case CategoryEnum.IMAGES:
			return CategoryEnum.IMAGES;
		default:
			return CategoryEnum.GENERAL;
	}
}
