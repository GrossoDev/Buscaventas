/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import CountrySelect from './CountrySelect';

function Topbar() {
  return (
    <div className="container d-flex justify-content-end align-items-center py-3 gap-2">
      <CountrySelect />
    </div>
  );
}

export default Topbar;
