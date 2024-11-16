/**
 * Describes the overall configuration for one category including search engines, ranking, and timings.
 * @typedef {Object} CategoryType
 * @property {Object.<string, EngineJSON>} engines - Configuration for each search engine by name.
 * @property {RankingJSON} ranking - Configuration for ranking parameters.
 * @property {TimingsJSON} timings - Configuration for operation timings.
 */

/**
 * Describes the configuration for individual search engines.
 * @typedef {Object} EngineJSON
 * @property {boolean} enabled - If false, the engine will not be used and other options will be ignored.
 * @property {boolean} required - If true, the engine will be awaited unless the hard timeout is reached.
 * @property {boolean} requiredbyorigin - If true, the fastest engine with this engine in "Origins" will be awaited unless the hard timeout is reached.
 * @property {boolean} preferred - If true, the engine will be awaited unless the preferred timeout is reached.
 * @property {boolean} preferredbyorigin - If true, the fastest engine with this engine in "Origins" will be awaited unless the preferred timeout is reached.
 */

/**
 * Describes the ranking configuration parameters.
 * @typedef {Object} RankingJSON
 * @property {number} rankexp - The exponent used on the rank itself.
 * @property {number} rankmul - Multiplier for the rank itself.
 * @property {number} rankconst - Addition to the rank itself.
 * @property {number} rankscoremul - Multiplier for the rank score (calculated as 100 / rank + other variables applied).
 * @property {number} rankscoreadd - Addition to the rank score.
 * @property {number} timesreturnedmul - Multiplier for the number of times the result was returned.
 * @property {number} timesreturnedadd - Addition to the number of times the result was returned.
 * @property {number} timesreturnedscoremul - Multiplier for the times returned score (calculated as log(timesReturnedNum + other variables applied)).
 * @property {number} timesreturnedscoreadd - Addition to the times returned score.
 * @property {Object.<string, EngineRankingJSON>} engines - Multipliers and additions for each engine, applied to the rank score.
 */

/**
 * Describes the ranking multipliers and additions for a specific engine.
 * @typedef {Object} EngineRankingJSON
 * @property {number} mul - Multiplier for the engine ranking.
 * @property {number} add - Addition to the engine ranking.
 */

/**
 * Describes the timing configuration for operations.
 * @typedef {Object} TimingsJSON
 * @property {string} preferredtimeout - Maximum amount of time to wait for the preferred engines (or by origin) to respond. If waiting for required engines (or by origin) after this time, the search continues.
 * @property {string} hardtimeout - Hard timeout after which the search is forcefully stopped, even if the engines didn't respond.
 */
