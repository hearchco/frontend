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

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const instanceName = env.PUBLIC_INSTANCE_NAME ?? 'Hearchco';
	const opensearchMethod = 'GET';
	const searchUrl = getSearchUrl();
	// TODO: <Url rel="suggestions" type="application/x-suggestions+json" method="{{ opensearch_method }}" template="{{ url_for('autocompleter', _external=True) }}?q={searchTerms}"/>
	// const suggestionsUrl = getSuggestionsUrl();

	// TODO: POST
	// <Url rel="results" type="text/html" method="${opensearchMethod}" template="${instanceUrl}search">
	// <Param name="q" value="{searchTerms}" />
	// </Url>

	const body = `
        <?xml version="1.0" encoding="utf-8"?>
        <OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">
            <ShortName>${instanceName}</ShortName>
            <LongName>Hearchco metasearch engine</LongName>
            <Description>Hearchco is a distributed and fast metasearch engine that respects your privacy.</Description>
            <InputEncoding>UTF-8</InputEncoding>
            <Image type="image/png">/favicon.png</Image>
            <Url rel="results" type="text/html" method="${opensearchMethod}" template="${searchUrl}?q={searchTerms}"/>
            <Url rel="self" type="application/opensearchdescription+xml" method="${opensearchMethod}" template="/opensearch.xml" />
            <Query role="example" searchTerms="Hearchco" />
            <moz:SearchForm>${searchUrl}</moz:SearchForm>
        </OpenSearchDescription>
    `;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/opensearchdescription+xml'
		}
	});
}
