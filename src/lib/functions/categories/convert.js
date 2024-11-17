import { CategoryEnum } from '$lib/types/search/categoryenum';
import { objectToBase64 } from '../encoding/base64';
import { imagesCategory } from './images';
import { scienceCategory } from './science';
import { suggestionsCategory } from './suggestions';
import { thoroughCategory } from './thorough';
import { webCategory } from './web';

/**
 * Returns the category config in Base64 format.
 * @param {CategoryEnum} category - The category string to map.
 * @returns {string} The category config.
 */
export function getCategoryConfigBase64(category) {
	switch (category) {
		case CategoryEnum.GENERAL:
			return objectToBase64(webCategory);
		case CategoryEnum.IMAGES:
			return objectToBase64(imagesCategory);
		case CategoryEnum.SCIENCE:
			return objectToBase64(scienceCategory);
		case CategoryEnum.THOROUGH:
			return objectToBase64(thoroughCategory);
		default:
			throw new Error(`Invalid category: ${category}`);
	}
}

/**
 * Return the suggestions category config in Base64 format.
 * @returns {string} The suggestions category config.
 */
export function getSuggestionsCategoryConfigBase64() {
	return objectToBase64(suggestionsCategory);
}
