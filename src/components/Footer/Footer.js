/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Logo from '../Logo';

function Footer() {
  return (
    <div className="d-flex border-top">
      <div className="container my-4 my-lg-5">
        <div className="row">
          <div className="col-sm-2 my-3 my-sm-0">
            <a className="text-reset text-decoration-none" href="/">
              <div className="mb-2"><Logo /></div>
              <span className="text-muted">Grigori Rasputin</span>
            </a>
          </div>
          <div className="col-sm-2 my-3 my-sm-0">
            <p className="fw-bold m-0">
              <a className="text-reset text-decoration-none" href="#">Inicio</a>
            </p>
          </div>
          <div className="col-sm my-3 my-sm-0">
            <p className="fw-bold">Proyectos Frontend</p>
            <p className="my-1">
              <a className="text-reset text-decoration-none" href="#">Buscaventas</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
