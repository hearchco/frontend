type EngineRank = {
	SearchEngine: string;
	Rank: number;
	Page: number;
	OnPageRank: number;
};

export type Result = {
	URL: string;
	Rank: number;
	Score: number;
	Title: string;
	Description: string;
	EngineRanks: EngineRank[];
	TimesReturned: number;
};
