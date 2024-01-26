import { useReducer, useEffect } from 'react';
import MercadoLibre from '../../services/MercadoLibre';
import '../../helpers/strings';

export const ActionType = {
  SET_FOCUS: 'SET_FOCUS',
  SET_QUERY: 'SET_QUERY',
  CLEAR_INPUT: 'CLEAR_INPUT',
  SET_SUGGESTIONS: 'SET_SUGGESTIONS',
  PREV_SUGGESTION: 'PREV_SUGGESTION',
  NEXT_SUGGESTION: 'NEXT_SUGGESTION'
};

const initialState = {
  focus: false,
  query: '',
  suggestions: [],
  selectedIndex: -1
};

function searchBarReducer(state, action) {
  switch (action.type) {
    case ActionType.SET_FOCUS:
      return { ...state, focus: action.payload };
    case ActionType.SET_QUERY:
      return { ...state, query: action.payload, selectedIndex: -1 };
    case ActionType.CLEAR_INPUT:
      return { ...state, query: '', selectedIndex: -1 };
    case ActionType.SET_SUGGESTIONS:
      return { ...state, suggestions: action.payload, selectedIndex: -1 };
    case ActionType.PREV_SUGGESTION:
      return { ...state, selectedIndex: Math.max(state.selectedIndex - 1, -1) };
    case ActionType.NEXT_SUGGESTION:
      return { ...state, selectedIndex: (state.selectedIndex + 1) % state.suggestions.length };
    default:
      return state;
  }
}

function useSuggestions(state, dispatch) {
  useEffect(() => {
    if (state.query.isEmptyOrWhitespace()) {
      dispatch({ type: ActionType.SET_SUGGESTIONS, payload: [] });
    } else {
      MercadoLibre
        .autosuggest(state.query).promise
        .then((results) => dispatch({ type: ActionType.SET_SUGGESTIONS, payload: results }));
    }
  }, [state.query]);
}

export function useSearchBar() {
  const [state, dispatch] = useReducer(searchBarReducer, initialState);
  useSuggestions(state, dispatch);

  const selectedSuggestion = state.selectedIndex >= 0
    ? state.suggestions[state.selectedIndex]
    : null;

  return [{ ...state, selectedSuggestion }, dispatch];
}
