import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
// comentario para teste

function Header({ name }) {
  return (
    <div className="profileTitle">
      <Link
        to="/profile"
      >
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
          className="img-icons"
        />
      </Link>
      <div className="title-content">
        <h1 data-testid="page-title" className="title-page">
          {' '}
          {name}
          {' '}
        </h1>
      </div>
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
