import React from 'react';
import '../../helpers/strings';

function AutosuggestBox({ queryText, suggestions, suggestionClick, selectedIndex }) {
  return (
    <div className={`container dropdown-menu position-absolute start-0 end-0 ${suggestions.length !== 0 ? 'show' : ''}`}>
      {
        !queryText.isEmptyOrWhitespace() && (
          suggestions.map((suggestion, index) => {
            const beginning = suggestion.q.substring(0, suggestion.match_start);
            const match = suggestion.q.substring(suggestion.match_start, suggestion.match_end);
            const ending = suggestion.q.substring(suggestion.match_end);

            return (
              <button
                key={suggestion.q}
                type="button"
                className={`btn dropdown-item py-2 ${index === selectedIndex ? 'active' : ''}`}
                onMouseDown={() => suggestionClick(suggestion.q)}
              >
                <i className="bi bi-search me-2" />

                { beginning.length > 0 && <strong>{beginning}</strong> }
                { match }
                { ending.length > 0 && <strong>{ending}</strong> }
              </button>
            );
          })
        )
      }
    </div>
  );
}

export default AutosuggestBox;
