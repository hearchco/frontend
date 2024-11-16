/**
 * Thorough category config.
 * @type {CategoryType}
 */
export const thoroughCategory = {
	engines: {
		bing: {
			enabled: true,
			required: true,
			requiredbyorigin: false,
			preferred: false,
			preferredbyorigin: false
		},
		brave: {
			enabled: true,
			required: true,
			requiredbyorigin: false,
			preferred: false,
			preferredbyorigin: false
		},
		duckduckgo: {
			enabled: true,
			required: true,
			requiredbyorigin: false,
			preferred: false,
			preferredbyorigin: false
		},
		etools: {
			enabled: true,
			required: true,
			requiredbyorigin: false,
			preferred: false,
			preferredbyorigin: false
		},
		google: {
			enabled: true,
			required: true,
			requiredbyorigin: false,
			preferred: false,
			preferredbyorigin: false
		},
		mojeek: {
			enabled: true,
			required: true,
			requiredbyorigin: false,
			preferred: false,
			preferredbyorigin: false
		},
		presearch: {
			enabled: true,
			required: true,
			requiredbyorigin: false,
			preferred: false,
			preferredbyorigin: false
		},
		qwant: {
			enabled: true,
			required: true,
			requiredbyorigin: false,
			preferred: false,
			preferredbyorigin: false
		},
		startpage: {
			enabled: true,
			required: true,
			requiredbyorigin: false,
			preferred: false,
			preferredbyorigin: false
		},
		swisscows: {
			enabled: true,
			required: true,
			requiredbyorigin: false,
			preferred: false,
			preferredbyorigin: false
		},
		yahoo: {
			enabled: true,
			required: true,
			requiredbyorigin: false,
			preferred: false,
			preferredbyorigin: false
		}
		// WARN: Disabled currently
		// yep: {
		// 	enabled: true,
		// 	required: true,
		// 	requiredbyorigin: false,
		// 	preferred: false,
		// 	preferredbyorigin: false
		// }
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
			brave: {
				mul: 1,
				add: 0
			},
			duckduckgo: {
				mul: 1,
				add: 0
			},
			etools: {
				mul: 1,
				add: 0
			},
			google: {
				mul: 1,
				add: 0
			},
			mojeek: {
				mul: 1,
				add: 0
			},
			presearch: {
				mul: 1,
				add: 0
			},
			qwant: {
				mul: 1,
				add: 0
			},
			startpage: {
				mul: 1,
				add: 0
			},
			swisscows: {
				mul: 1,
				add: 0
			},
			yahoo: {
				mul: 1,
				add: 0
			}
			// WARN: Disabled currently
			// yep: {
			//     mul: 1,
			//     add: 0
			// }
		}
	},
	timings: {
		preferredtimeout: '3000',
		hardtimeout: '5000'
	}
};
