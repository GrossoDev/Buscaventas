import React, { useState } from 'react';
import MercadoLibre from '../services/MercadoLibre';
import Strings from '../helpers/strings';

function SearchBar({ onSearch }) {
  const [queryText, setQueryText] = useState('');
  const [autoResults, setAutoResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(queryText);
  };

  const inputChange = (e) => {
    const text = e.target.value;

    if (!Strings.isEmptyOrWhitespace(text)) {
      MercadoLibre.autosuggest(text).promise
        .then((suggestions) => setAutoResults(suggestions));
    }

    return setQueryText(text);
  };

  const suggestionClick = (text) => {
    setQueryText(text);
    onSearch(text);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={queryText} onChange={inputChange} />
        <button type="submit">Buscar</button>

        <div className="autocompleteBox">
          {
            !Strings.isEmptyOrWhitespace(queryText) && (
              <ul>
                {
                  autoResults.map((result) => (
                    // eslint-disable-next-line max-len
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                    <li onClick={() => suggestionClick(result.q)}>
                      {result.q}
                    </li>
                  ))
                }
              </ul>
            )
          }
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
