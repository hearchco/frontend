import { fetchPublicResultsJSON } from "$lib/functions/fetchPublicResultsJSON";
import type { ResultType } from "$lib/types/result";

export async function fetchResultsLazily(start: number, offset: number, offsetIncrement: number, results: ResultType[], paramsString: string): Promise<[number, ResultType[]]> {
    // increment offset by offsetIncrement so we get more results
    const newOffset: number = offset + offsetIncrement;

    // create URLParams object from string and set start parameter
    const params: URLSearchParams = new URLSearchParams(paramsString);
    params.set("start", (start + newOffset).toString());

    // get additional results
    let additionalResults: ResultType[];
    try {
        additionalResults = await fetchPublicResultsJSON(params);
    } catch(err: any) {
        throw new Error(`Error fetching additional results: ${err.message}`);
    }

    // append additional results to combined results while removing duplicates
    const combinedResults: ResultType[] = [...results, ...additionalResults.filter((r) => !results.some((result) => result.URL === r.URL))];

    // adjust new results' ranks to continue from the last rank of the existing results
    for (let i: number = results.length; i < combinedResults.length; i++) {
        combinedResults[i].Rank = i + 1;
    }

    return [newOffset, combinedResults];
}