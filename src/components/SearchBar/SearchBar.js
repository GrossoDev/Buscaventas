import React, { useState } from 'react';
import AutosuggestBox from './AutosuggestBox';
import { useSuggestions } from './hooks';
import '../../helpers/strings';

function SearchBar({ onSearch }) {
  const [focus, setFocus] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestions = useSuggestions(queryText);

  const isSelectionValid = selectedIndex !== -1 && selectedIndex < suggestions.length;

  const clearInput = () => {
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
        newIndex = -1;
      }
    } else if (e.keyCode === 9) { // Tab = autocomplete input with current selection
      if (isSelectionValid) {
        setQueryText(suggestions[selectedIndex].q);
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
          type="text"
          className="form-control"
          value={queryText}
          onKeyDown={keyDown}
          onChange={inputChange}
          placeholder="Ingrese un artículo para buscar..."
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />

        {
        focus && !queryText.isEmptyOrWhitespace() && (
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
        }

        <button className="btn btn-primary px-4" type="submit" title="Buscar">
          <i className="bi bi-search" />
        </button>
      </form>

      {
      focus && !queryText.isEmptyOrWhitespace() && (
        <AutosuggestBox
          queryText={queryText}
          suggestions={suggestions}
          suggestionClick={suggestionClick}
          selectedIndex={selectedIndex}
        />
      )
      }
    </div>
  );
}

export default SearchBar;
