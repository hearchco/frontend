import { CategoryEnum } from '$lib/types/search/categoryenum';
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
		case CategoryEnum.WEB:
			return btoa(JSON.stringify(webCategory));
		case CategoryEnum.IMAGES:
			return btoa(JSON.stringify(imagesCategory));
		case CategoryEnum.SCIENCE:
			return btoa(JSON.stringify(scienceCategory));
		case CategoryEnum.THOROUGH:
			return btoa(JSON.stringify(thoroughCategory));
		default:
			throw new Error(`Invalid category: ${category}`);
	}
}

/**
 * Return the suggestions category config in Base64 format.
 * @returns {string} The suggestions category config.
 */
export function getSuggestionsCategoryConfigBase64() {
	return btoa(JSON.stringify(suggestionsCategory));
}
