/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import AutosuggestBox from './AutosuggestBox';

export default {
  title: 'SearchBar/AutosuggestBox',
  component: AutosuggestBox,
  argTypes: { suggestionClick: { action: 'suggestionClick' } }
};

const Template = (args) => <AutosuggestBox {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  queryText: '',
  suggestions: [],
  selectedIndex: -1
};

export const SomeSuggestions = Template.bind({});
SomeSuggestions.args = {
  queryText: 'ault',
  suggestions: [
    { q: 'aultito', match_start: 0, match_end: 4 },
    { q: 'renault clio', match_start: 3, match_end: 7 },
    { q: 'pedales aulte', match_start: 8, match_end: 12 }
  ],
  selectedIndex: -1
};
