import React from 'react';

function Result({
  title,
  thumbnail,
  link,
  price
}) {
  return (
    <div className="mb-4 w-100">
      <a className="text-decoration-none d-flex text-reset" href={link} target="_blank" rel="noopener noreferrer">
        <div className="flex-shrink-0">
          <img className="img-thumbnail object-fit-fill rounded" width="96px" src={thumbnail} alt="" />
        </div>

        <div className="flex-grow-1 ms-3 d-flex flex-column justify-content-center">
          <span className="">{title}</span>
          <span>{`$${price}`}</span>
        </div>

        <div className="ms-3 me-3 d-flex align-items-center">
          <i className="bi bi-box-arrow-up-right" />
        </div>
      </a>
    </div>
  );
}

export default Result;
