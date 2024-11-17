/**
 * Images category config.
 * @type {CategoryType}
 */
export const imagesCategory = {
	engines: {
		bing: {
			enabled: true,
			required: false,
			requiredbyorigin: true,
			preferred: false,
			preferredbyorigin: false
		},
		google: {
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
			bing: {
				mul: 1,
				add: 0
			},
			google: {
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
