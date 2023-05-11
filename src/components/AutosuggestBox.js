import React from 'react';
import Strings from '../helpers/strings';

function AutosuggestBox({ queryText, suggestions, suggestionClick }) {
  return (
    <div className="autocompleteBox">
      {
        !Strings.isEmptyOrWhitespace(queryText) && (
        <ul>
            {
              suggestions.map((suggestion) => (
              // eslint-disable-next-line max-len
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                <li onClick={() => suggestionClick(suggestion.q)}>
                  {suggestion.q}
                </li>
              ))
            }
        </ul>
        )
      }
    </div>
  );
}

export default AutosuggestBox;
