import React from 'react';
import Suggestion from './Suggestion';
import '../../helpers/strings';

function AutosuggestBox({ queryText, suggestions, suggestionClick, selectedIndex }) {
  return (
    <div className={`container dropdown-menu position-absolute start-0 end-0 ${suggestions.length !== 0 ? 'show' : ''}`}>
      {
        !queryText.isEmptyOrWhitespace()
        && suggestions.map((suggestion, index) => (
          <Suggestion
            key={suggestion.q}
            suggestion={suggestion}
            isSelected={index === selectedIndex}
            onClick={suggestionClick}
          />
        ))
      }
    </div>
  );
}

export default AutosuggestBox;
