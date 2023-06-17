import React from 'react';
import Suggestion from './Suggestion';
import '../../helpers/strings';

function AutosuggestBox({ queryText, suggestions, onClick, selected }) {
  return (
    <div className={`container dropdown-menu position-absolute start-0 end-0 ${suggestions.length !== 0 ? 'show' : ''}`}>
      {
        !queryText.isEmptyOrWhitespace()
        && suggestions.map((suggestion) => (
          <Suggestion
            key={suggestion.q}
            suggestion={suggestion}
            isSelected={suggestion === selected}
            onClick={onClick}
          />
        ))
      }
    </div>
  );
}

export default AutosuggestBox;
