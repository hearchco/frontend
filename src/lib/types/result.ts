type EngineRank = {
	SearchEngine: string;
	Rank: number;
	Page: number;
	OnPageRank: number;
};

type ImageFormat = {
	Height: number;
	Width: number;
};

type ImageResult = {
	Original: ImageFormat;
	Thumbnail: ImageFormat;
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
