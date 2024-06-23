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
 * @typedef {Array<string|string[]>} SuggestionsResponseType
 * @property {string} 0 - The first element is a string.
 * @property {string[]} 1 - The second element is an array of strings.
 */
