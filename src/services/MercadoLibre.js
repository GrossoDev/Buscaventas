import axios from 'axios';
import uuid from 'react-uuid';

const site = 'MLA'; // TODO: MLA is for MercadoLibre Argentina. Let the user choose.
const PAGING = 50; // The amount of results per request
const LIMIT = 1000; // The maximum amount amount of results

// TODO: some sort of schema
function parseResults(results) {
  return results.reduce((arr, result) => arr.concat({
    id: result.id,
    title: result.title,
    thumbnail: result.thumbnail,
    link: result.permalink,
    price: result.price,
    freeShipping: result.shipping.free_shipping,
    condition: result.condition,
    seller: {
      id: result.seller.id,
      address: `${result.address.city_name}, ${result.address.state_name}`,
      link: result.seller.permalink,
      level: result.seller.seller_reputation.level_id
    }
  }), []);
}

function search(queryText, max) {
  const maxResults = max || 50;
  const promises = [];

  // Make a promise for each range of requests
  for (let offset = 0; offset < maxResults && offset < LIMIT; offset += PAGING) {
    const url = `https://api.mercadolibre.com/sites/${site}/search?q=${queryText}&offset=${offset}`;

    promises.push(Promise.resolve(axios.get(url)
      .then(({ data }) => parseResults(data.results))));
  }

  const query = Promise.all(promises)
    .then((results) => results.flat())
    .then((results) => ({
      id: uuid(),
      title: queryText,
      results
    }));

  return query;
}

export default { search };
