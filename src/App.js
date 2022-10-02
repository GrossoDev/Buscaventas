import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Queries from './components/Queries';
import Sellers from './components/Sellers';
import MercadoLibre from './services/MercadoLibre';
import FilterModal from './components/FilterModal';

function App() {
  const [queries, setQueries] = useState([]);
  const [filteringQuery, setFilteringQuery] = useState();

  const handleSearch = (text) => {
    const queryText = text.trim().toUpperCase();

    if (queryText === '') {
      console.warn('The query title was empty.');
      return;
    }
    if (queries.find((query) => query.title === queryText)) {
      console.warn("There's already a query with the title:", queryText);
      return;
    }

    const placeholderQuery = MercadoLibre.search(queryText, 300);
    setQueries(queries.concat(placeholderQuery));

    placeholderQuery.actualQuery.then(
      (query) => setQueries(
        (currentQueries) => currentQueries
          .filter((q) => q.id !== placeholderQuery.id)
          .concat(query)
      )
    );
  };

  const handleFilterApply = (contain, dontContain, minPrice, maxPrice, condition) => {
    let filteredResults = filteringQuery.results;

    if (contain) {
      filteredResults = filteredResults
        .filter((result) => contain.every(
          (val) => result.title.toUpperCase().includes(val.toUpperCase())
        ));
    }
    if (dontContain) {
      filteredResults = filteredResults
        .filter((result) => dontContain.every(
          (val) => !result.title.toUpperCase().includes(val.toUpperCase())
        ));
    }
    if (minPrice) {
      filteredResults = filteredResults.filter((result) => result.price >= minPrice);
    }
    if (maxPrice) {
      filteredResults = filteredResults.filter((result) => result.price <= maxPrice);
    }
    if (condition) {
      filteredResults = filteredResults.filter((result) => result.condition === condition);
    }

    const filteredQuery = { ...filteringQuery, filteredResults };
    filteredQuery.filters = {
      contain,
      dontContain,
      minPrice,
      maxPrice,
      condition
    };

    setQueries(queries.map((query) => (query.id !== filteredQuery.id ? query : filteredQuery)));
    setFilteringQuery(null);
  };

  const handleRemoveQuery = (id) => {
    const query = queries.find((q) => q.id === id);

    if (query.isPlaceholder) query.cancel();

    setQueries(queries.filter((q) => query !== q));
  };

  const handleFilterQuery = (id) => setFilteringQuery(queries.find((query) => query.id === id));
  const handleFilterCancel = () => setFilteringQuery(null);

  return (
    <div className="App">
      <h1>Buscaventas</h1>

      <SearchBar onSearch={handleSearch} />

      <Queries queries={queries} onFilter={handleFilterQuery} onRemove={handleRemoveQuery} />

      <Sellers queries={queries} />

      {
        filteringQuery
        && (
          <FilterModal
            query={filteringQuery}
            onApply={handleFilterApply}
            onCancel={handleFilterCancel}
          />
        )
      }
    </div>
  );
}

export default App;
