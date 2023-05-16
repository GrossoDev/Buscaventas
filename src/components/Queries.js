import React from 'react';
import Query from './Query';

function Queries({ queries, onFilter, onRemove }) {
  return (
    <div className="container mt-4">
      <p className="display-6 mb-4">Búsquedas</p>
      {
        queries?.length
          ? queries.map(
            (query) => <Query key={query.id} {...{ query, onFilter, onRemove }} />
          )
          : (
            <>
              <p>Haz una búsqueda en el cuadro de arriba para comenzar.</p>
              <p>Cuando hagas al menos dos búsquedas, te mostraremos los vendedores disponibles.</p>
            </>
          )
      }
    </div>
  );
}

export default Queries;
