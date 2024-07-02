/**
 * Describes the properties of a suggestion result.
 * @typedef {Object} SuggestionType
 * @property {string} value - Value of the suggestion.
 * @property {number} rank - The rank of the suggestion.
 * @property {number} score - The score of the suggestion.
 * @property {EngineRankSimpleType[]} engine_ranks - Rankings on different search engines.
 */

/**
 * Represents the ranking of a result on a specific search engine.
 * @typedef {Object} EngineRankSimpleType
 * @property {string} search_engine - The name of the search engine.
 * @property {number} rank - The overall rank of the result.
 */
