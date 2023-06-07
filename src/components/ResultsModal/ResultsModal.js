/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Result from '../Result';

function ResultsModal({ currentSeller }) {
  const { seller, results } = currentSeller;
  const totalPrice = results.reduce((acc, result) => acc + result.price, 0);

  return (
    <div id="resultsModal" className="modal fade">
      <div className="modal-dialog modal-xl modal-fullscreen-lg-down modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{seller.name}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
          </div>

          <div className="modal-body">
            {
              results.map((result) => (
                <Result
                  title={result.title}
                  thumbnail={result.thumbnail}
                  link={result.link}
                  price={result.price}
                />
              ))
            }
          </div>

          <div className="modal-footer">
            <div className="fs-5 flex-grow-1">
              <span>Total: </span>
              <span className="ms-1 fw-bold">
                {`$ ${totalPrice.toLocaleString()}`}
              </span>
            </div>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsModal;
