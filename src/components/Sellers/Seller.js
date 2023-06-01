/* eslint-disable object-curly-newline */
import React from 'react';

function Thumbnail({ result }) {
  return (
    <a href={result.link}>
      <img className="object-fit-contain" src={result.thumbnail} alt={result.title} style={{ width: '43px', height: '43px' }} />
    </a>
  );
}

function FreeShippingBadge({ freeShipping }) {
  return (
    freeShipping
      ? (
        <p className="m-0 text-success">
          <span className="d-none d-sm-block">
            <i className="bi bi-truck me-2" />
            <b>Con envío gratis</b>
          </span>
          <span className="d-block d-sm-none">
            <i className="bi bi-truck me-2" />
            <b>Envío gratis</b>
          </span>
        </p>
      )
      : (
        <p className="m-0 text-secondary">
          <span className="d-none d-sm-block">
            <i className="bi bi-truck-flatbed me-2" />
            <b>Sin envío gratis</b>
          </span>
          <span className="d-block d-sm-none">
            <i className="bi bi-truck-flatbed me-2" />
            <b>Envío pago</b>
          </span>
        </p>
      )
  );
}

function Seller({ seller, results, totalPrice, freeShipping }) {
  const openAll = () => {
    results.forEach((result) => window.open(result.link));
  };

  return (
    <div className="d-flex mb-2">
      <div className="flex-shrink-0">
        <div className="d-flex flex-wrap img-thumbnail rounded" style={{ width: '96px', height: '96px' }}>
          {
            results.length > 4
              ? (
                <>
                  <Thumbnail key={results[0].id} result={results[0]} />
                  <Thumbnail key={results[1].id} result={results[1]} />
                  <Thumbnail key={results[2].id} result={results[2]} />
                  <span className="d-flex flex-grow-1 justify-content-center align-items-center text-dark bg-light" src="" alt="">
                    <b>{`+${results.length - 3}`}</b>
                  </span>
                </>
              )
              : results.map((result) => <Thumbnail key={result.id} result={result} />)
          }
        </div>
      </div>

      <div className="flex-grow-1 ms-3 d-flex flex-column justify-content-center">
        <span className="fs-3">
          {`$ ${totalPrice.toLocaleString()}`}
        </span>
        <p className="text-muted text-capitalize d-none d-md-block">{ seller.address }</p>
        <div className="me-2 d-block d-md-none align-items-center">
          <FreeShippingBadge freeShipping={freeShipping} />
        </div>
      </div>

      <div className="me-2 d-none d-md-flex align-items-center">
        <FreeShippingBadge freeShipping={freeShipping} />
      </div>

      <div className="d-flex align-items-center">
        <button
          className="btn btn-outline-primary m-1"
          type="button"
          onClick={openAll}
        >
          Ver todos
          <i className="bi bi-box-arrow-up-right ms-2" />
        </button>
      </div>
    </div>
  );
}

export default Seller;
