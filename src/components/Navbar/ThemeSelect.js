/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

function ThemeSelect() {
  let currentTheme = localStorage.getItem('theme') || 'auto';

  const setTheme = (theme) => {
    if (theme === 'auto') {
      const actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      document.documentElement.setAttribute('data-bs-theme', actualTheme);
    } else if (theme === 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }

    currentTheme = theme;
    localStorage.setItem('theme', theme);
  };

  setTheme(currentTheme);

  return (
    <div className="dropdown">
      <button type="button" className="btn rounded-pill" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="bi bi-moon-stars-fill" />
        <span className="visually-hidden">Cambiar tema</span>
      </button>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" onClick={() => setTheme('light')}>
            <i className="bi bi-brightness-high-fill me-2" />
            Claro
          </a>
        </li>
        <li>
          <a className="dropdown-item" onClick={() => setTheme('dark')}>
            <i className="bi bi-moon-stars-fill me-2" />
            Oscuro
          </a>
        </li>
        <li>
          <a className="dropdown-item" onClick={() => setTheme('auto')}>
            <i className="bi bi-circle-half me-2" />
            Auto
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ThemeSelect;
