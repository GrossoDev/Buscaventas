/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import Result from './Result';

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

function FilterModal({ filteringQuery, onApply }) {
  const query = filteringQuery || { filters: {}, results: [] };

  const [filters, setFilters] = useState(query.filters);
  const filteredResults = filterResults(query.results, filters);

  useEffect(() => {
    setFilters(query.filters);
  }, [filteringQuery]);

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

  return (
    <div id="filterModal" className="modal fade">
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{query.title}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
          </div>

          <div className="modal-body">
            {
              // TODO: Lazy loading
              filteredResults.map((result) => (
                <Result
                  key={uuid()}
                  title={result.title}
                  thumbnail={result.thumbnail}
                  link={result.link}
                  price={result.price}
                />
              ))
            }
          </div>

          <div className="modal-footer">
            <form onSubmit={handleSubmit}>
              <label>
                Contiene:
                <input name="contain" type="text" onChange={changeContain} value={filters.contain ? String(filters.contain).replaceAll(',', ' ') : ''} />
              </label>
              <label>
                No contiene:
                <input name="dontContain" type="text" onChange={changeDontContain} value={filters.dontContain ? String(filters.dontContain).replaceAll(',', ' ') : ''} />
              </label>
              <label>
                Precio mínimo:
                <input name="minPrice" type="number" onChange={changeMinPrice} value={filters.minPrice} />
              </label>
              <label>
                Precio máximo:
                <input name="maxPrice" type="number" onChange={changeMaxPrice} value={filters.maxPrice} />
              </label>
              <label>
                Condición:
                <select name="condition" onChange={changeCondition} value={filters.condition}>
                  <option value="new">Nuevo</option>
                  <option value="used">Usado</option>
                  <option value="">Cualquiera</option>
                </select>
              </label>
            </form>

            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Aplicar filtros</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
