import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import { createApiUrl } from '$lib/functions/api/createurl';
import { getSuggestionsCategoryConfigBase64 } from '$lib/functions/categories/convert';

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
 * @param {'GET' | 'POST'} opensearchMethod - The method to use for searching.
 * @returns {string} - The OpenSearch XML body.
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

	const instanceUrl = getInstanceUrl();
	const faviconSize = 16;
	const faviconType = 'image/x-icon';
	const faviconUrl = `${instanceUrl}favicon.ico`;
	const searchUrl = `${instanceUrl}search`;
	const suggestionsUrl = createApiUrl('/search/suggestions').toString();
	const suggestionsCategory = getSuggestionsCategoryConfigBase64();
	const opensearchUrl = `${instanceUrl}opensearch.xml`;

	return `
<?xml version="1.0" encoding="utf-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">
	<ShortName>${instanceNameShort}</ShortName>
	<Description>${descriptionShort}</Description>
	<InputEncoding>UTF-8</InputEncoding>
	<Image width="${faviconSize}" height="${faviconSize}" type="${faviconType}">${faviconUrl}</Image>
	<Url rel="results" type="text/html" method="${opensearchMethod}" template="${searchUrl}">
		<Param name="q" value="{searchTerms}" />
	</Url>
	<Url rel="suggestions" type="application/x-suggestions+json" method="${opensearchMethod}" template="${suggestionsUrl}">
		<Param name="category" value="${suggestionsCategory}" />
		<Param name="q" value="{searchTerms}" />
	</Url>
	<Url rel="self" type="application/opensearchdescription+xml" method="${opensearchMethod}" template="${opensearchUrl}" />
	<Query role="example" searchTerms="Hearch..." />
	<moz:SearchForm>${searchUrl}</moz:SearchForm>
</OpenSearchDescription>
	`.trim();
}

/** @returns {string} */
function getInstanceUrl() {
	const instanceUri = env.PUBLIC_URI;
	if (!instanceUri) {
		error(500, 'PUBLIC_URI is not set');
	}

	return `${instanceUri}${instanceUri.endsWith('/') ? '' : '/'}`;
}
