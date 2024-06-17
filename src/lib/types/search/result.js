/**
 * Describes the properties of a search result.
 * @typedef {Object} ResultType
 * @property {string} url - URL of the result.
 * @property {string} url_hash - Hash of the URL.
 * @property {number} rank - The rank of the result.
 * @property {number} score - The score of the result.
 * @property {string} title - The title of the result.
 * @property {string} description - The description of the result.
 * @property {EngineRankType[]} engine_ranks - Rankings on different search engines.
 * @property {string} favicon - URL of the favicon.
 * ImageResultType
 * @property {ImageFormatType} original - The original image format details.
 * @property {ImageFormatType} thumbnail - The thumbnail image format details.
 * @property {string} thumbnail_url - URL to the thumbnail image.
 * @property {string} thumbnail_url_hash - Hash of the thumbnail URL.
 * @property {string} source - The source of the image.
 * @property {string} source_url - URL of the image source.
 */

/**
 * Represents the ranking of a result on a specific search engine.
 * @typedef {Object} EngineRankType
 * @property {string} search_engine - The name of the search engine.
 * @property {number} rank - The overall rank of the result.
 * @property {number} page - The page number on which the result appears.
 * @property {number} on_page_rank - The rank of the result on the specific page.
 */

/**
 * Defines the format of an image.
 * @typedef {Object} ImageFormatType
 * @property {number} height - The height of the image in pixels.
 * @property {number} width - The width of the image in pixels.
 */
