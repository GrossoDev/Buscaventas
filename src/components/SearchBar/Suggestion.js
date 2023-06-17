import React from 'react';

function Suggestion({ suggestion, isSelected, onClick }) {
  const beginning = suggestion.q.substring(0, suggestion.match_start);
  const match = suggestion.q.substring(suggestion.match_start, suggestion.match_end);
  const ending = suggestion.q.substring(suggestion.match_end);

  return (
    <button
      type="button"
      className={`btn dropdown-item py-2 ${isSelected ? 'active' : ''}`}
      onMouseDown={() => onClick(suggestion.q)}
    >
      <i className="bi bi-search me-2" />

      {beginning.length > 0 && <strong>{beginning}</strong>}
      {match}
      {ending.length > 0 && <strong>{ending}</strong>}
    </button>
  );
}

export default Suggestion;
