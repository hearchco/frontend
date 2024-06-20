import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

const opensearchType = 'application/opensearchdescription+xml';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const body = getOpensearchXml('GET');
	return new Response(body, {
		headers: {
			'Content-Type': opensearchType
		}
	});
}

/** @type {import('./$types').RequestHandler} */
export async function POST() {
	const body = getOpensearchXml('POST');
	return new Response(body, {
		headers: {
			'Content-Type': opensearchType
		}
	});
}

/**
 * @param {'GET' | 'POST'} opensearchMethod - The method to use for searching
 * @returns {string} - The OpenSearch XML body
 */
function getOpensearchXml(opensearchMethod) {
	const instanceName = env.PUBLIC_INSTANCE_NAME ?? 'Hearchco';
	const instanceNameShort = instanceName.slice(
		0,
		instanceName.length > 16 ? 16 : instanceName.length
	);

	const description =
		env.PUBLIC_DESCRIPTION ??
		'Hearchco is a distributed and fast metasearch engine that respects your privacy.';
	const descriptionShort = description.slice(
		0,
		description.length > 1024 ? 1024 : description.length
	);

	const faviconType = 'image/x-icon';
	const faviconSize = 16;

	const instanceUrl = getInstanceUrl();
	const searchUrl = getSearchUrl();
	const faviconUrl = getFaviconUrl();
	// TODO: const suggestionsUrl = getSuggestionsUrl();

	const searchUrlTag =
		opensearchMethod === 'GET'
			? `<Url rel="results" type="text/html" method="${opensearchMethod}" template="${searchUrl}?q={searchTerms}" />`
			: `
			<Url rel="results" type="text/html" method="${opensearchMethod}" template="${searchUrl}">
				<Param name="q" value="{searchTerms}" />
			</Url>
			`;

	// TODO: <Url rel="suggestions" type="application/x-suggestions+json" method="{{ opensearch_method }}" template="{{ url_for('autocompleter', _external=True) }}?q={searchTerms}"/>
	const body = `
<?xml version="1.0" encoding="utf-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">
	<ShortName>${instanceNameShort}</ShortName>
	<Description>${descriptionShort}</Description>
	<InputEncoding>UTF-8</InputEncoding>
	<Image width="${faviconSize}" height="${faviconSize}" type="${faviconType}">${faviconUrl}</Image>
	${searchUrlTag}
	<Url rel="self" type="application/opensearchdescription+xml" method="${opensearchMethod}" template="${instanceUrl}opensearch.xml" />
	<Query role="example" searchTerms="Hearchco" />
	<moz:SearchForm>${searchUrl}</moz:SearchForm>
</OpenSearchDescription>
	`.trim();

	return body;
}

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
function getFaviconUrl() {
	const instanceUrl = getInstanceUrl();
	return `${instanceUrl}favicon.ico`;
}

// function getSuggestionsUrl() {
// 	const instanceUrl = getInstanceUrl();
// 	return `${instanceUrl}suggestions`;
// }
