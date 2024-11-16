/**
 * Enum for category types.
 * @enum {string}
 * @readonly
 */
export const CategoryEnum = {
	WEB: 'web',
	IMAGES: 'images',
	SCIENCE: 'science',
	THOROUGH: 'thorough'
};

/**
 * Converts a string to a category type if possible.
 * @param {string} category - The category to convert.
 * @returns {CategoryEnum | undefined} The category type.
 */
export function toCategoryEnumType(category) {
	switch (category) {
		case 'web':
		case 'normal':
		case 'general':
			return CategoryEnum.WEB;
		case 'images':
		case 'image':
		case 'imgs':
		case 'img':
		case 'i':
			return CategoryEnum.IMAGES;
		case 'science':
		case 'sci':
			return CategoryEnum.SCIENCE;
		case 'thorough':
		case 'detailed':
		case 'slow':
			return CategoryEnum.THOROUGH;
		default:
			return undefined;
	}
}
