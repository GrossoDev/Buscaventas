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
    setQueryText('');
    setSelectedIndex(-1);
  };

  const submit = (text) => {
    onSearch(text);
    clearInput();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isSelectionValid) {
      submit(suggestions[selectedIndex].q);
    } else {
      submit(queryText);
    }

    clearInput();
  };

  const handleKeyDown = (e) => {
    let newIndex = selectedIndex;

    switch (e.keyCode) {
      case 40: // Down arrow
        newIndex = selectedIndex + 1;
        break;
      case 38: // Up arrow
        newIndex = selectedIndex - 1;
        break;
      case 9: // Tab
      case 32: // Space bar
        // Autocomplete input with current selection
        if (isSelectionValid) {
          setQueryText(suggestions[selectedIndex].q);
          newIndex = -1;
          e.preventDefault(); // Prevent loss of focus
        }
        break;
      default:
        break;
    }

    if (newIndex < -1) newIndex = -1;
    if (newIndex >= suggestions.length) newIndex = 0;

    setSelectedIndex(newIndex);
  };

  return (
    <div className="container position-relative">
      <form className="input-group mb-1" onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="form-control"
          value={queryText}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onKeyDown={handleKeyDown}
          onChange={({ target }) => setQueryText(target.value)}
          placeholder="Ingrese un artículo para buscar..."
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
          suggestionClick={submit}
          selectedIndex={selectedIndex}
        />
      )
      }
    </div>
  );
}

export default SearchBar;
