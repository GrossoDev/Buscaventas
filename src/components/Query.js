import React from 'react';

function Query({ query, onFilter, onRemove }) {
  if (query.isPlaceholder) {
    return (
      <div className="d-flex mb-2">
        <div className="flex-shrink-0">
          <div className="img-thumbnail rounded d-flex align-items-center justify-content-center" style={{ width: '96px', height: '96px' }}>
            <div className="spinner-border" role="status" />
          </div>
        </div>

        <div className="flex-grow-1 ms-3 d-flex flex-column justify-content-center">
          <span className="fs-5">{query.title}</span>
          <p className="text-muted d-block">
            Buscando...
          </p>
        </div>

        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-danger m-1"
            type="button"
            onClick={() => onRemove(query.id)}
            aria-label="Quitar búsqueda"
          >
            <i className="bi bi-trash-fill" />
          </button>
        </div>
      </div>
    );
  }

  const firstResult = query.filteredResults[0];
  const thumbnail = firstResult?.thumbnail;
  const minimumPrice = firstResult?.price;

  return (
    <div className="d-flex mb-2">
      {
      query.filteredResults?.length // If there are results in the query
        ? (
          <>
            <div className="flex-shrink-0">
              <img className="img-thumbnail object-fit-contain rounded" src={thumbnail} alt="" style={{ width: '96px', height: '96px' }} />
            </div>

            <div className="flex-grow-1 ms-3 d-flex flex-column justify-content-center">
              <span className="fs-5">{query.title}</span>
              <p className="text-muted d-none d-md-block">
                {query.filteredResults.length}
                {query.filteredResults.length === 1 ? ' resultado' : ' resultados'}
              </p>
              <p className="me-2 d-block d-md-none align-items-center">
                Empieza por
                {' '}
                <b>{`$ ${minimumPrice.toLocaleString()}`}</b>
              </p>
            </div>

            <div className="me-2 d-none d-md-flex align-items-center">
              <p className="m-0">
                Empieza por
                {' '}
                <b>{`$ ${minimumPrice.toLocaleString()}`}</b>
              </p>
            </div>
          </>
        )
        : (
          <>
            <div className="flex-shrink-0">
              <div className="img-thumbnail rounded d-flex align-items-center justify-content-center" style={{ width: '96px', height: '96px' }}>
                <i className="display-5 bi bi-question" />
              </div>
            </div>

            <div className="flex-grow-1 ms-3 d-flex flex-column justify-content-center">
              <span className="fs-5">{query.title}</span>
              <p className="text-muted d-block">
                No hay resultados
              </p>
            </div>
          </>
        )
      }

      <div className="d-flex align-items-center">
        <button
          className="btn btn-outline-success m-1"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#filterModal"
          onClick={() => onFilter(query.id)}
          aria-label="Filtrar"
        >
          <i className="bi bi-funnel-fill" />
        </button>
        <button
          className="btn btn-outline-danger m-1"
          type="button"
          onClick={() => onRemove(query.id)}
          aria-label="Quitar búsqueda"
        >
          <i className="bi bi-trash-fill" />
        </button>
      </div>
    </div>
  );
}

export default Query;
