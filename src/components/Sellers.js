import React from 'react';
import Seller from './Seller';

function Sellers({ queries }) {
  const queriesReady = queries.filter((query) => !query.isPlaceholder);

  if (queriesReady.length < 2) {
    return <div />;
  }

  // Extract sellers from query.result.seller
  // Filter unique sellers
  const sellers = queriesReady
    .reduce((acc, query) => acc.concat(query.results.map((result) => result.seller)), [])
    .filter((seller, index, array) => array.findIndex((value) => value.id === seller.id) === index);

  // Create seller-results pairs
  // Make sure all sellers contain results for all queries
  const resultsBySeller = sellers.map((seller) => (
    {
      seller,
      results: queriesReady
        .map((query) => query.results.find((result) => result.seller.id === seller.id))
    }
  )).filter(({ results }) => results.every((v) => v));

  return (
    <div id="sellers">
      <div>
        {resultsBySeller?.length}
        {resultsBySeller?.length === 1 ? ' vendedor' : ' vendedores'}
      </div>
      <div>
        {resultsBySeller.map(({ seller, results }) => (
          <Seller key={seller.id} seller={seller} results={results} />
        ))}
      </div>
    </div>
  );
}

export default Sellers;
