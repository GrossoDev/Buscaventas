/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

function filterResults(results, filters) {
  let filteredResults = results;

  if (filters.contain) {
    filteredResults = filteredResults
      .filter((result) => filters.contain.every(
        (val) => result.title.toUpperCase().includes(val.toUpperCase())
      ));
  }
  if (filters.dontContain) {
    filteredResults = filteredResults
      .filter((result) => filters.dontContain.every(
        (val) => !result.title.toUpperCase().includes(val.toUpperCase())
      ));
  }
  if (filters.minPrice) {
    filteredResults = filteredResults.filter((result) => result.price >= filters.minPrice);
  }
  if (filters.maxPrice) {
    filteredResults = filteredResults.filter((result) => result.price <= filters.maxPrice);
  }
  if (filters.condition) {
    filteredResults = filteredResults.filter((result) => result.condition === filters.condition);
  }

  return filteredResults;
}

function Result({ title, thumbnail, link }) {
  return (
    <div>
      <img src={thumbnail} alt="" />

      <a href={link} target="_blank" rel="noopener noreferrer">
        <p>{title}</p>
      </a>
    </div>
  );
}

function FilterModal({ query, onApply, onCancel }) {
  const [filters, setFilters] = useState(query.filters);
  const filteredResults = filterResults(query.results, filters);

  const changeContain = ({ target }) => {
    let contain = null;

    if (target.value) contain = target.value.split(' ');

    setFilters({ ...filters, contain });
  };

  const changeDontContain = ({ target }) => {
    let dontContain = null;

    if (target.value) dontContain = target.value.split(' ');

    setFilters({ ...filters, dontContain });
  };

  const changeMinPrice = ({ target }) => setFilters({ ...filters, minPrice: Number(target.value) });

  const changeMaxPrice = ({ target }) => setFilters({ ...filters, maxPrice: Number(target.value) });

  const changeCondition = ({ target }) => setFilters({ ...filters, condition: target.value });

  const handleSubmit = (event) => {
    event.preventDefault();

    onApply(filteredResults, filters);
  };

  const modalStyle = {
    position: 'absolute',
    top: '30px',
    bottom: '30px',
    left: '60px',
    right: '60px',
    boxShadow: '0px 0px 50px 0px gray',
    backgroundColor: 'white'
  };

  const resultsBoxStyle = {
    overflow: 'scroll',
    height: '80%'
  };

  return (
    <div style={modalStyle}>
      <p>{query.title}</p>

      <div style={resultsBoxStyle}>
        {
          // TODO: Lazy loading
          filteredResults.map((result) => (
            <Result
              key={result.id}
              title={result.title}
              thumbnail={result.thumbnail}
              link={result.link}
            />
          ))
        }
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Contiene:
          <input name="contain" type="text" onChange={changeContain} defaultValue={query.filters.contain ? String(query.filters.contain) : ''} />
        </label>
        <label>
          No contiene:
          <input name="dontContain" type="text" onChange={changeDontContain} defaultValue={query.filters.dontContain ? String(query.filters.dontContain) : ''} />
        </label>
        <label>
          Precio mínimo:
          <input name="minPrice" type="number" onChange={changeMinPrice} defaultValue={query.filters.minPrice} />
        </label>
        <label>
          Precio máximo:
          <input name="maxPrice" type="number" onChange={changeMaxPrice} defaultValue={query.filters.maxPrice} />
        </label>
        <label>
          Condición:
          <select name="condition" onChange={changeCondition} defaultValue={query.filters.condition}>
            <option value="new">Nuevo</option>
            <option value="used">Usado</option>
            <option value="">Cualquiera</option>
          </select>
        </label>

        <button type="submit">Aplicar filtro</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
}

export default FilterModal;
