import React from 'react';

function CountrySelect() {
  let currentCountry = localStorage.getItem('country') || 'MLA';

  const setCountry = (country) => {
    currentCountry = country;
    localStorage.setItem('country', country);
  };

  setCountry(currentCountry);

  return (
    <div className="">
      <select
        className="form-select form-select-sm rounded-pill border-0"
        name="country"
        defaultValue={currentCountry}
        onChange={({ target }) => setCountry(target.value)}
      >
        <option value="MLA">🇦🇷 Argentina</option>
        <option value="MBO">🇧🇴 Bolivia</option>
        <option value="MLB">🇧🇷 Brasil (español)</option>
        <option value="MLC">🇨🇱 Chile</option>
        <option value="MCO">🇨🇴 Colombia</option>
        <option value="MCR">🇨🇷 Costa Rica</option>
        <option value="MRD">🇩🇴 República Dominicana</option>
        <option value="MEC">🇪🇨 Ecuador</option>
        <option value="MGT">🇬🇹 Guatemala</option>
        <option value="MHN">🇭🇳 Honduras</option>
        <option value="MLM">🇲🇽 México</option>
        <option value="MNI">🇳🇮 Nicaragua</option>
        <option value="MPA">🇵🇦 Panamá</option>
        <option value="MPY">🇵🇾 Paraguay</option>
        <option value="MPE">🇵🇪 Perú</option>
        <option value="MSV">🇸🇻 El Salvador</option>
        <option value="MLU">🇺🇾 Uruguay</option>
        <option value="MLV">🇻🇪 Venezuela</option>
      </select>
    </div>
  );
}

export default CountrySelect;
