import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Queries from './components/Queries';
import Sellers from './components/Sellers';
import FilterModal from './components/FilterModal';
import MercadoLibre from './services/MercadoLibre';
import Strings from './helpers/strings';

const resultCount = 1000;

function App() {
  const [queries, setQueries] = useState([]);
  const [filteringQuery, setFilteringQuery] = useState();

  const handleSearch = (text) => {
    const queryText = text.trim().toUpperCase();

    if (Strings.isEmptyOrWhitespace(queryText)) {
      console.warn('The query title was empty.');
      return;
    }
    if (queries.find((query) => query.title === queryText)) {
      console.warn("There's already a query with the title:", queryText);
      return;
    }

    const placeholderQuery = MercadoLibre.search(queryText, resultCount);
    setQueries(queries.concat(placeholderQuery));

    placeholderQuery.actualQuery.then(
      (query) => setQueries(
        (currentQueries) => currentQueries
          .filter((q) => q.id !== placeholderQuery.id)
          .concat(query)
      )
    );
  };

  const handleFilterApply = (filteredResults, filters) => {
    const filteredQuery = { ...filteringQuery, filteredResults, filters };

    setQueries(queries.map((query) => (query.id !== filteredQuery.id ? query : filteredQuery)));
  };

  const handleRemoveQuery = (id) => {
    const query = queries.find((q) => q.id === id);

    if (query.isPlaceholder) query.cancel();

    setQueries(queries.filter((q) => query !== q));
  };

  const handleFilterQuery = (id) => setFilteringQuery(queries.find((query) => query.id === id));

  return (
    <div className="App min-vh-100">
      <main>
        <h1 className="display-1 d-flex mt-5 justify-content-center">Buscaventas</h1>

        <SearchBar onSearch={handleSearch} />

        <Queries queries={queries} onFilter={handleFilterQuery} onRemove={handleRemoveQuery} />

        <Sellers queries={queries} />

        <FilterModal filteringQuery={filteringQuery} onApply={handleFilterApply} />
      </main>
    </div>
  );
}

export default App;
