import { useEffect, useState } from 'react';
import MercadoLibre from '../../services/MercadoLibre';

export function useSuggestions(query) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.isEmptyOrWhitespace()) {
      setSuggestions([]);
    } else {
      MercadoLibre
        .autosuggest(query).promise
        .then(setSuggestions);
    }
  }, [query]);

  return suggestions;
}

export default { useSuggestions };
