/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import CountrySelect from './CountrySelect';
import ThemeSelect from '../ThemeSelect';

function Topbar() {
  return (
    <div className="container d-flex justify-content-end align-items-center py-3 gap-2">
      <CountrySelect />
      <ThemeSelect />
    </div>
  );
}

export default Topbar;
