type EngineRank = {
	SearchEngine: string;
	Rank: number;
	Page: number;
	OnPageRank: number;
};

type Image = {
	Height: number;
	Width: number;
};

type ImageResult = {
	Original: Image;
	Thumbnail: Image;
	ThumbnailURL: string;
	Source: string;
	SourceURL: string;
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
