import React from 'react';
import AutosuggestBox from './AutosuggestBox';
import { useSearchBar, ActionType } from './searchBarReducer';

function SearchBar({ onSearch }) {
  const [state, dispatch] = useSearchBar();
  const { focus, query, suggestions, selectedSuggestion } = state;

  const submit = (text) => {
    onSearch(text);
    dispatch({ type: ActionType.CLEAR_INPUT });
  };

  const handleFormSubmit = (e) => {
    submit(selectedSuggestion?.q || query);

    e.preventDefault();
  };

  const handleKeyDown = (e) => {
    switch (e.keyCode) {
      case 38: // Up arrow
        dispatch({ type: ActionType.PREV_SUGGESTION });
        break;
      case 40: // Down arrow
        dispatch({ type: ActionType.NEXT_SUGGESTION });
        break;
      case 9: // Tab
      case 32: // Space bar
        // Autocomplete input with current selection
        if (selectedSuggestion) {
          dispatch({ type: ActionType.SET_QUERY, payload: selectedSuggestion.q });
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="container position-relative">
      <form className="input-group mb-1" onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="form-control"
          value={query}
          onFocus={() => dispatch({ type: ActionType.SET_FOCUS, payload: true })}
          onBlur={() => dispatch({ type: ActionType.SET_FOCUS, payload: false })}
          onKeyDown={handleKeyDown}
          onChange={({ target }) => dispatch({ type: ActionType.SET_QUERY, payload: target.value })}
          placeholder="Ingrese un artículo para buscar..."
        />

        {
        focus && !query.isEmptyOrWhitespace() && (
          <div
            className="d-flex align-items-center position-relative m-0"
            style={{ left: '-24px', width: 0, zIndex: 1000 }}
            onMouseDown={() => dispatch({ type: ActionType.CLEAR_INPUT })}
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
      focus && !query.isEmptyOrWhitespace() && (
        <AutosuggestBox
          queryText={query}
          suggestions={suggestions}
          selected={selectedSuggestion}
          onClick={submit}
        />
      )
      }
    </div>
  );
}

export default SearchBar;
