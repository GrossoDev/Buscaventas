import axios from 'axios';
import uuid from 'react-uuid';

const PAGING = 50; // The amount of results per request
const LIMIT = 1000; // Maximum number of results. Hard limit by MercadoLibre

// TODO: some sort of schema
function parseResults(results) {
  return results.map((result) => ({
    id: uuid(), // ML's id is _somehow_ not unique
    title: result.title,
    thumbnail: result.thumbnail,
    link: result.permalink,
    price: Math.round(result.price),
    freeShipping: result.shipping.free_shipping,
    condition: result.condition,
    seller: {
      id: result.seller.id,
      name: result.seller.nickname,
      address: `${result.address.city_name}, ${result.address.state_name}`,
      link: result.seller.permalink,
      level: result.seller.seller_reputation.level_id
    }
  }));
}

function search(queryText, max) {
  const maxResults = max || 50;
  const site = localStorage.getItem('country') || 'MLA';
  const promises = [];
  const controller = new AbortController();
  const defaultQuery = {
    id: uuid(),
    title: queryText,
    results: [],
    filteredResults: [],
    filters: {
      contain: null,
      dontContain: null,
      minPrice: 0,
      maxPrice: 0,
      condition: 'new'
    }
  };

  // Make a promise for each range of requests
  for (let offset = 0; offset < maxResults && offset < LIMIT; offset += PAGING) {
    const url = `https://api.mercadolibre.com/sites/${site}/search?q=${encodeURIComponent(queryText)}&offset=${offset}`;

    promises.push(
      axios.get(url, { signal: controller.signal })
        .then(({ data }) => parseResults(data.results))
    );
  }

  const query = Promise.all(promises)
    .then((results) => results.flat().sort((a, b) => a.price - b.price))
    .then((results) => ({
      ...defaultQuery,
      results,
      filteredResults: results
    }));

  const placeholderQuery = {
    ...defaultQuery,
    isPlaceholder: true,
    actualQuery: query,
    cancel: controller.abort.bind(controller)
  };

  return placeholderQuery;
}

function autosuggest(queryText) {
  const count = 6;
  const site = localStorage.getItem('country') || 'MLA';
  const url = `https://http2.mlstatic.com/resources/sites/${site}/autosuggest?limit=${count}&q=${encodeURIComponent(queryText)}`;

  const controller = new AbortController();
  const promise = axios
    .get(url, { signal: controller.signal })
    .then(({ data }) => data.suggested_queries);

  return { promise, cancel: controller.abort.bind(controller) };
}

export default { search, autosuggest };
