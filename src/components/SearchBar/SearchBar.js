import React, { useState } from 'react';
import AutosuggestBox from './AutosuggestBox';
import MercadoLibre from '../../services/MercadoLibre';
import '../../helpers/strings';

function SearchBar({ onSearch }) {
  const [queryText, setQueryText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [focus, setFocus] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const isSelectionValid = selectedIndex !== -1 && selectedIndex < suggestions.length;

  const clearInput = () => {
    setSuggestions([]);
    setSelectedIndex(-1);
    setQueryText('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSelectionValid) {
      onSearch(suggestions[selectedIndex].q);
    } else {
      onSearch(queryText);
    }

    clearInput();
  };

  const suggestionClick = (text) => {
    onSearch(text);
    clearInput();
  };

  const inputChange = (e) => {
    const text = e.target.value;

    if (text.isEmptyOrWhitespace()) {
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
    } else if (e.keyCode === 9) { // Tab = autocomplete input with current selection
      if (isSelectionValid) {
        setQueryText(suggestions[selectedIndex].q);
        setSuggestions([]);
        newIndex = -1;

        e.preventDefault(); // Prevent loss of focus
      }
    }

    if (newIndex < -1) newIndex = -1;
    if (newIndex >= suggestions.length) newIndex = 0;

    setSelectedIndex(newIndex);
  };

  return (
    <div className="container position-relative">
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

        {
        focus && !queryText.isEmptyOrWhitespace()
          ? (
            <div
              className="d-flex align-items-center position-relative m-0"
              style={{ left: '-24px', width: 0, zIndex: 1000 }}
              onMouseDown={clearInput}
              role="button"
              aria-hidden
            >
              <i className="bi bi-x" />
            </div>
          )
          : null
        }

        <button className="btn btn-primary px-4" type="submit" title="Buscar">
          <i className="bi bi-search" />
        </button>
      </form>

      {
      focus && !queryText.isEmptyOrWhitespace()
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
