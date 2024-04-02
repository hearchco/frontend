type EngineRank = {
	search_engine: string;
	rank: number;
	page: number;
	on_page_rank: number;
};

export type ImageFormat = {
	height: number;
	width: number;
};

type ImageResult = {
	original: ImageFormat;
	thumbnail: ImageFormat;
	thumbnail_url: string;
	thumbnail_url_hash: string;
	source: string;
	source_url: string;
};

export type ResultType = {
	url: string;
	url_hash: string;
	rank: number;
	score: number;
	title: string;
	description: string;
	engine_ranks: EngineRank[];
	image_result: ImageResult;
};

export type ErrorResponseType = {
	message: string;
	value: string;
};
