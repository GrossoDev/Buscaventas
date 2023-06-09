import React from 'react';
import Seller from './Seller';
import '../../helpers/arrays';

function Sellers({ queries, onSelect }) {
  const queriesReady = queries.filter((query) => !query.isPlaceholder);

  // Extract sellers from query.result.seller
  // Filter unique sellers
  const sellers = queriesReady
    .map((query) => query.filteredResults.map((result) => result.seller))
    .flat()
    .unique((seller) => seller.id);

  // Create seller-results pairs
  // Remove result-seller pairs with no results
  // Add extra info about each seller
  // Sort them by total price
  const resultsBySeller = sellers
    .map((seller) => ({
      seller,
      results: queriesReady
        .map((query) => query.filteredResults.find((result) => result.seller.id === seller.id))
    }))
    .filter(({ results }) => results.every((v) => v))
    .map(({ seller, results }) => ({
      seller,
      results,
      totalPrice: results.reduce((total, result) => total + result.price, 0),
      freeShipping: results.some((result) => result.freeShipping)
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
