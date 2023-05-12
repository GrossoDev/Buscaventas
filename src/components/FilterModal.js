/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import Strings from '../helpers/strings';
import Result from './Result';

function contains(result, text) {
  if (Strings.isEmptyOrWhitespace(text)) return false;
  return result.includes(text);
}

function filterResults(results, filters) {
  let filteredResults = results;

  if (filters.contain) {
    filteredResults = filteredResults
      .filter((result) => filters.contain.every(
        (text) => contains(result.title.toUpperCase(), text.toUpperCase())
      ));
  }
  if (filters.dontContain) {
    filteredResults = filteredResults
      .filter((result) => filters.dontContain.every(
        (text) => !contains(result.title.toUpperCase(), text.toUpperCase())
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
            <h1 className="modal-title fs-5">{query.title}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
          </div>

          <div className="modal-body">
            {
              // TODO: Lazy loading
              filteredResults.slice(0, 100).map((result) => (
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

          <form className="p-3 border-top container d-flex justify-content-evenly" onSubmit={handleSubmit}>
            <label className="col-2">
              Contiene:
              <input className="form-control" placeholder="Debe decir..." name="contain" type="text" onChange={changeContain} value={filters.contain ? String(filters.contain).replaceAll(',', ' ') : ''} />
            </label>
            <label className="col-2">
              No contiene:
              <input className="form-control" placeholder="No debe decir..." name="dontContain" type="text" onChange={changeDontContain} value={filters.dontContain ? String(filters.dontContain).replaceAll(',', ' ') : ''} />
            </label>
            <label className="col-2">
              Precio mínimo:
              <input className="form-control" name="minPrice" type="number" min="0" onChange={changeMinPrice} value={filters.minPrice} />
            </label>
            <label className="col-2">
              Precio máximo:
              <input className="form-control" name="maxPrice" type="number" min="0" onChange={changeMaxPrice} value={filters.maxPrice} />
            </label>
            <label className="col-2">
              Condición:
              <select className="form-select" name="condition" onChange={changeCondition} value={filters.condition}>
                <option value="new">Nuevo</option>
                <option value="used">Usado</option>
                <option value="">Cualquiera</option>
              </select>
            </label>
          </form>

          <div className="modal-footer">
            <div className="text-muted flex-grow-1">
              {
                filteredResults.length === 1
                  ? '1 resultado'
                  : `${filteredResults.length} resultados`
              }
            </div>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Aplicar filtros</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
