/**
 * Enum for category types.
 * @enum {string}
 * @readonly
 */
export const CategoryEnum = {
	GENERAL: 'general',
	IMAGES: 'images',
	SCIENCE: 'science',
	THOROUGH: 'thorough'
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
		case 'normal':
			return CategoryEnum.GENERAL;
		case 'images':
			return CategoryEnum.IMAGES;
		case 'image':
			return CategoryEnum.IMAGES;
		case 'science':
			return CategoryEnum.SCIENCE;
		case 'sci':
			return CategoryEnum.SCIENCE;
		case 'thorough':
			return CategoryEnum.THOROUGH;
		case 'slow':
			return CategoryEnum.THOROUGH;
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
