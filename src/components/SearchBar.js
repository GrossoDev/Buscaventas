import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [queryText, setQueryText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(queryText);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={queryText} onChange={(e) => setQueryText(e.target.value)} />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;
