import React, { useState } from 'react';
import AutosuggestBox from './AutosuggestBox';
import MercadoLibre from '../services/MercadoLibre';
import Strings from '../helpers/strings';

function SearchBar({ onSearch }) {
  const [queryText, setQueryText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(queryText);
  };

  const inputChange = (e) => {
    const text = e.target.value;

    if (!Strings.isEmptyOrWhitespace(text)) {
      MercadoLibre.autosuggest(text).promise.then(setSuggestions);
    }

    return setQueryText(text);
  };

  const suggestionClick = (text) => {
    setQueryText(text);
    onSearch(text);
  };

  return (
    <div>
      <form className="container input-group mb-3" onSubmit={handleSubmit}>
        <input className="form-control" type="text" value={queryText} onChange={inputChange} />
        <button className="btn btn-primary" type="submit">Buscar</button>
      </form>

      <AutosuggestBox
        queryText={queryText}
        suggestions={suggestions}
        suggestionClick={suggestionClick}
      />
    </div>
  );
}

export default SearchBar;
