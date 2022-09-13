import React from 'react';

function Result({ result }) {
  return (
    <a href={result.link}>
      <img src={result.thumbnail} alt={result.title} />
    </a>
  );
}

function Seller({ seller, results }) {
  const totalPrice = results.reduce((total, result) => total + result.price, 0);
  const freeShipping = results.some((result) => result.freeShipping);

  return (
    <div>
      {results.map((result) => <Result key={result.id} result={result} />)}

      <p>
        $
        {' '}
        {totalPrice}
      </p>
      <p>
        {freeShipping ? 'Envío gratis' : 'Envío no incluido'}
      </p>
      <p>{ seller.address }</p>
    </div>
  );
}

export default Seller;
