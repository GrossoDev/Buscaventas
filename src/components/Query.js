import React from 'react';

function Query({ query, onFilter, onRemove }) {
  // TODO: temporary style, replace later
  const style = {
    display: 'flex',
    alignItems: 'center'
  };

  // TODO: join all the possibl renders
  if (query.isPlaceholder) {
    return (
      <div style={style}>
        <img src="" alt="" />

        <div>
          <p>
            {query.title}
          </p>
          <p>
            Cargando...
          </p>
        </div>

        <button type="button" onClick={() => onRemove(query.id)}>Quitar búsqueda</button>
      </div>
    );
  }

  if (!query.results?.length) {
    return (
      <div style={style}>
        <img src="" alt="" />

        <div>
          <p>
            No hay resultados para
            {' '}
            {query.title}
          </p>
        </div>

        <button type="button" onClick={() => onRemove(query.id)}>Quitar búsqueda</button>
      </div>
    );
  }

  const { thumbnail, price: minimumPrice } = query.results[0];

  return (
    <div style={style}>
      <img src={thumbnail} alt="" />

      <div>
        <p>{query.title}</p>
        <p>
          {query.results.length}
          {query.results.length === 1 ? ' resultado' : ' resultados'}
        </p>
      </div>

      <div>
        <p>
          Empieza por $
          {' '}
          {minimumPrice}
        </p>
      </div>

      <button type="button" onClick={() => onFilter(query.id)}>Filtrar</button>
      <button type="button" onClick={() => onRemove(query.id)}>Quitar búsqueda</button>
    </div>
  );
}

export default Query;
