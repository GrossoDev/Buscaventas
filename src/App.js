import React from 'react';
import SearchBar from './components/SearchBar';
import Queries from './components/Queries';
import Sellers from './components/Sellers';

function App() {
  const handleSearch = (queryText) => console.log(queryText);

  return (
    <div className="App">
      Buscaventas

      <SearchBar onSearch={handleSearch} />

      <Queries />

      <Sellers />
    </div>
  );
}

export default App;
