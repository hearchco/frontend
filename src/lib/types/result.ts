type EngineRank = {
	SearchEngine: string;
	Rank: number;
	Page: number;
	OnPageRank: number;
};

type Image = {
	URL: string;
	Height: number;
	Width: number;
};

type ImageResult = {
	Source: string;
	Original: Image;
	Thumbnail: Image;
};

export type ResultType = {
	URL: string;
	Rank: number;
	Score: number;
	Title: string;
	Description: string;
	EngineRanks: EngineRank[];
	TimesReturned: number;
	ImageResult: ImageResult;
};
