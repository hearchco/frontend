import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

/** @returns {string} */
function getInstanceUrl() {
	const instanceUri = env.PUBLIC_URI;
	if (!instanceUri) {
		error(500, 'PUBLIC_URI is not set');
	}

	const instanceUrl = `${instanceUri}${instanceUri.endsWith('/') ? '' : '/'}`;
	return instanceUrl;
}

/** @returns {string} */
function getSearchUrl() {
	const instanceUrl = getInstanceUrl();
	return `${instanceUrl}search`;
}

/** @returns {string} */
function getSuggestionsUrl() {
	const instanceUrl = getInstanceUrl();
	return `${instanceUrl}suggestions`;
}

/**
 * @param {'GET' | 'POST'} opensearchMethod - The method to use for searching
 * @returns {string} - The OpenSearch XML body
 */
function getOpenSearchXml(opensearchMethod) {
	const instanceName = env.PUBLIC_INSTANCE_NAME ?? 'Hearchco';
	const searchUrl = getSearchUrl();
	// TODO: const suggestionsUrl = getSuggestionsUrl();

	const searchUrlTag =
		opensearchMethod === 'GET'
			? `<Url rel="results" type="text/html" method="${opensearchMethod}" template="${searchUrl}?q={searchTerms}"/>`
			: `<Url rel="results" type="text/html" method="${opensearchMethod}" template="${searchUrl}">
				<Param name="q" value="{searchTerms}" />
			</Url>`;

	// TODO: <Url rel="suggestions" type="application/x-suggestions+json" method="{{ opensearch_method }}" template="{{ url_for('autocompleter', _external=True) }}?q={searchTerms}"/>
	const body = `
        <?xml version="1.0" encoding="utf-8"?>
        <OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">
            <ShortName>${instanceName}</ShortName>
            <LongName>Hearchco metasearch engine</LongName>
            <Description>Hearchco is a distributed and fast metasearch engine that respects your privacy.</Description>
            <InputEncoding>UTF-8</InputEncoding>
            <Image type="image/png">/favicon.png</Image>
            ${searchUrlTag}
            <Url rel="self" type="application/opensearchdescription+xml" method="${opensearchMethod}" template="/opensearch.xml" />
            <Query role="example" searchTerms="Hearchco" />
            <moz:SearchForm>${searchUrl}</moz:SearchForm>
        </OpenSearchDescription>
    `;

	return body;
}

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const opensearchMethod = 'GET';
	const body = getOpenSearchXml(opensearchMethod);
	return new Response(body, {
		headers: {
			'Content-Type': 'application/opensearchdescription+xml'
		}
	});
}

/** @type {import('./$types').RequestHandler} */
export async function POST() {
	const opensearchMethod = 'POST';
	const body = getOpenSearchXml(opensearchMethod);
	return new Response(body, {
		headers: {
			'Content-Type': 'application/opensearchdescription+xml'
		}
	});
}
