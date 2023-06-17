/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';
import SearchBar from './SearchBar';

export default {
  title: 'Components/SearchBar/SearchBar',
  component: SearchBar,
  argTypes: { onSearch: { action: 'onSearch' } }
};

const Template = (args) => (
  <SearchBar {...args} />
);

export const Default = Template.bind({});
