/* eslint-disable object-curly-newline */
import React from 'react';
import Seller from './Seller';

function Sellers({ queries, onSelect }) {
  const queriesReady = queries.filter((query) => !query.isPlaceholder);

  // Extract sellers from query.result.seller
  // Filter unique sellers
  const sellers = queriesReady
    .map((query) => query.filteredResults.map((result) => result.seller))
    .flat()
    .filter((seller, index, array) => array.findIndex((value) => value.id === seller.id) === index);

  // Create seller-results pairs
  // Make sure all sellers contain results for all queries
  const resultsBySeller = sellers
    .map((seller) => ({
      seller,
      results: queriesReady
        .map((query) => query.filteredResults.find((result) => result.seller.id === seller.id))
    }))
    .filter(({ results }) => results.every((v) => v)) // Remove result-seller pairs with no results
    .map((pair) => ({
      ...pair,
      totalPrice: pair.results.reduce((total, result) => total + result.price, 0),
      freeShipping: pair.results.some((result) => result.freeShipping)
    }))
    .sort((a, b) => a.totalPrice - b.totalPrice);

  return (
    <div className="container mt-5">
      <p className="display-6 mb-4">Vendedores</p>

      {
        queriesReady.length > 1
          ? (
            <div>
              <div className="text-muted">
                {resultsBySeller?.length}
                {resultsBySeller?.length === 1 ? ' vendedor' : ' vendedores'}
              </div>
              <div className="mt-4">
                {
                  resultsBySeller.map(({ seller, results, totalPrice, freeShipping }) => (
                    <Seller
                      key={seller.id}
                      onSelect={onSelect}
                      seller={seller}
                      results={results}
                      totalPrice={totalPrice}
                      freeShipping={freeShipping}
                    />
                  ))
                }
              </div>
            </div>
          )
          : <p>Cuando hagas al menos dos búsquedas, te mostraremos los vendedores disponibles.</p>
      }
    </div>
  );
}

export default Sellers;
