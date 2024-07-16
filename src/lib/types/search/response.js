/**
 * Defines the structure for error responses.
 * @typedef {Object} ErrorResponseType
 * @property {string} message - The error message.
 * @property {string} value - The error value or code.
 */

/**
 * Defines the structure for results responses.
 * @typedef {Object} ResultsResponseType
 * @property {string} version - The version of the API.
 * @property {number} duration - The duration of the search in milliseconds.
 * @property {ResultType[]} results - The search results.
 */

/**
 * @typedef {Object} SuggestionsResponseType
 * @property {string} version - The version of the API.
 * @property {number} duration - The duration of the search in milliseconds.
 * @property {SuggestionType[]} suggestions - The suggestions.
 */

/**
 * @typedef {Object} ExchangeResponseType
 * @property {string} version - The version of the API.
 * @property {number} duration - The duration of the search in milliseconds.
 * @property {string} base - The base currency.
 * @property {string} from - The currency to be exchanged.
 * @property {string} to - The currency to be exchanged to.
 * @property {number} amount - The amount to be exchanged.
 * @property {number} result - The exchange rate result.
 */
