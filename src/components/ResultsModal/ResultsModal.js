/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function ResultsModal() {
  return (
    <div id="resultsModal" className="modal fade">
      <div className="modal-dialog modal-xl modal-fullscreen-lg-down modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Modal</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
          </div>

          <div className="modal-body">
            Cuerpo
          </div>

          <div className="modal-footer">
            <div className="text-muted flex-grow-1">
              Footer
            </div>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsModal;
