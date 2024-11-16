import { CategoryEnum } from './categoryenum';

/**
 * Asserts that the given results are images result type using the category.
 * @param {WebResultType[] | ImagesResultType[]} results
 * @param {CategoryEnum} category
 * @returns {results is ImagesResultType[]}
 */
export function assertImagesResultType(results, category) {
	return category === CategoryEnum.IMAGES;
}
