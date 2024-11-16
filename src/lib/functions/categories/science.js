/**
 * Science category config.
 * @type {CategoryType}
 */
export const scienceCategory = {
	engines: {
		googlescholar: {
			enabled: true,
			required: false,
			requiredbyorigin: true,
			preferred: false,
			preferredbyorigin: false
		}
	},
	ranking: {
		rankexp: 0.5,
		rankmul: 1,
		rankconst: 0,
		rankscoremul: 1,
		rankscoreadd: 0,
		timesreturnedmul: 1,
		timesreturnedadd: 0,
		timesreturnedscoremul: 1,
		timesreturnedscoreadd: 0,
		engines: {
			googlescholar: {
				mul: 1,
				add: 0
			}
		}
	},
	timings: {
		preferredtimeout: '500',
		hardtimeout: '1500'
	}
};
