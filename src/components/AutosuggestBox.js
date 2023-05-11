import React from 'react';
import Strings from '../helpers/strings';

function AutosuggestBox({
  queryText,
  suggestions,
  suggestionClick,
  selectedIndex
}) {
  return (
    <div className={`container dropdown-menu position-absolute start-0 end-0 ${suggestions.length !== 0 ? 'show' : ''}`}>
      {
        !Strings.isEmptyOrWhitespace(queryText) && (
          suggestions.map((suggestion, index) => {
            const beginning = suggestion.q.substring(0, suggestion.match_start);
            const midsection = suggestion.q.substring(suggestion.match_start, suggestion.match_end);
            const ending = suggestion.q.substring(suggestion.match_end);

            return (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                className={`dropdown-item py-2 ${index === selectedIndex ? 'active' : ''}`}
                href="#"
                onClick={() => suggestionClick(suggestion.q)}
                key={suggestion.q}
              >
                <i className="bi bi-search me-2" />
                {
                beginning.length > 0
                  ? <strong>{beginning}</strong>
                  : null
                }
                {midsection}
                {
                ending.length > 0
                  ? <strong>{ending}</strong>
                  : null
                }
              </a>
            );
          })
        )
      }
    </div>
  );
}

export default AutosuggestBox;
