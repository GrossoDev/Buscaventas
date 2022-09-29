import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Queries from './components/Queries';
import Sellers from './components/Sellers';
import MercadoLibre from './services/MercadoLibre';

function App() {
  const [queries, setQueries] = useState([]);

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

    MercadoLibre.search(queryText)
      .then((query) => setQueries(queries.concat(query)));
  };

  const handleFilterQuery = (queryId) => console.log('Filtering query', queryId);

  const handleRemoveQuery = (queryId) => {
    setQueries(queries.filter((query) => query.id !== queryId));
  };

  return (
    <div className="App">
      <h1>Buscaventas</h1>

      <SearchBar onSearch={handleSearch} />

      <Queries queries={queries} onFilter={handleFilterQuery} onRemove={handleRemoveQuery} />

      <Sellers queries={queries} />
    </div>
  );
}

export default App;
