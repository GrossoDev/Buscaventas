/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Logo from '../Logo';
import ThemeSelect from './ThemeSelect';
import './Navbar.css';

function Navbar({ themeSelect }) {
  return (
    <nav className="navbar navbar-expand-lg border-bottom">
      <div className="container py-0 py-lg-3">
        <a className="navbar-brand" href="#">
          <Logo />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-4 flex-grow-1">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">Inicio</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Proyectos Frontend
                <i className="bi bi-caret-down-fill ms-2" />
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Buscaventas</a></li>
              </ul>
            </li>
          </ul>
          <div className="flex-shrink-1 m-3 m-sm-0">
            {
              themeSelect
                ? <ThemeSelect />
                : null
            }
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
