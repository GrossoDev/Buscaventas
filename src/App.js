import React, { useState } from 'react';
import Topbar from './components/Topbar';
import SearchBar from './components/SearchBar';
import Queries from './components/Queries';
import Sellers from './components/Sellers';
import FilterModal from './components/FilterModal';
import ResultsModal from './components/ResultsModal';
import MercadoLibre from './services/MercadoLibre';
import './helpers/strings';

const resultCount = 1000;

function App() {
  const [queries, setQueries] = useState([]);
  const [filteringQuery, setFilteringQuery] = useState();
  const [currentSeller, setCurrentSeller] = useState();

  const handleSearch = (text) => {
    const queryText = text.trim().toUpperCase();

    if (queryText.isEmptyOrWhitespace()) {
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

  const handleSellerSelected = (seller, results) => setCurrentSeller({ seller, results });

  const handleFilterQuery = (id) => setFilteringQuery(queries.find((query) => query.id === id));

  return (
    <div className="App min-vh-100 pb-5">
      <Topbar />

      <main className="pt-5">
        <h1 className="mb-4 text-center fw-semibold display-1">Buscaventas</h1>

        <p className="mb-5 text-center fw-medium fs-5">
          Encuentra fácilmente vendedores que ofrecen todos los productos que necesitas.
        </p>

        <SearchBar onSearch={handleSearch} />
      </main>

      <Queries queries={queries} onFilter={handleFilterQuery} onRemove={handleRemoveQuery} />

      <Sellers queries={queries} onSelect={handleSellerSelected} />

      <FilterModal filteringQuery={filteringQuery} onApply={handleFilterApply} />

      <ResultsModal currentSeller={currentSeller} />
    </div>
  );
}

export default App;
