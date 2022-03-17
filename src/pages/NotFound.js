import React from 'react';
import notFound from '../images/notfound.png';
import '../NotFound.css';

function NotFound() {
  return (
    <div className="containerError">
      <img src={ notFound } alt="404 - not Found" className="imgError" />
      <h1 className="textError">Not Found</h1>
    </div>
  );
}

export default NotFound;
