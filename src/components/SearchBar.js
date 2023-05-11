import React, { useState } from 'react';
import AutosuggestBox from './AutosuggestBox';
import MercadoLibre from '../services/MercadoLibre';
import Strings from '../helpers/strings';

function SearchBar({ onSearch }) {
  const [queryText, setQueryText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [focus, setFocus] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const isSelectionValid = selectedIndex !== -1 && selectedIndex < suggestions.length;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSelectionValid) {
      onSearch(suggestions[selectedIndex].q);
    } else {
      onSearch(queryText);
    }

    setSuggestions([]);
    setSelectedIndex(-1);
    setQueryText('');
  };

  const inputChange = (e) => {
    const text = e.target.value;

    if (Strings.isEmptyOrWhitespace(text)) {
      setSuggestions([]);
    } else {
      MercadoLibre.autosuggest(text).promise.then(setSuggestions);
    }

    setQueryText(text);
  };

  const keyDown = (e) => {
    let newIndex = selectedIndex;

    if (e.keyCode === 40) { // Down arrow = move down
      newIndex = selectedIndex + 1;
    } else if (e.keyCode === 38) { // Up arrow = move up
      newIndex = selectedIndex - 1;
    } else if (e.keyCode === 32) { // Space bar = autocomplete input with current selection
      if (isSelectionValid) {
        setQueryText(suggestions[selectedIndex].q);
        setSuggestions([]);
        newIndex = -1;
      }
    }

    if (newIndex < -1) newIndex = -1;
    if (newIndex >= suggestions.length) newIndex = 0;

    setSelectedIndex(newIndex);
  };

  const suggestionClick = (text) => {
    setQueryText(text);
    onSearch(text);
  };

  return (
    <div className="container position-relative px-0">
      <form className="input-group mb-1" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          placeholder="Ingrese un artículo para buscar..."
          value={queryText}
          onChange={inputChange}
          onKeyDown={keyDown}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />

        <button className="btn btn-primary px-4" type="submit" title="Buscar">
          <i className="bi bi-search" />
        </button>
      </form>

      {
      focus
        ? (
          <AutosuggestBox
            queryText={queryText}
            suggestions={suggestions}
            suggestionClick={suggestionClick}
            selectedIndex={selectedIndex}
          />
        )
        : null
      }
    </div>
  );
}

export default SearchBar;
