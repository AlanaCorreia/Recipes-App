import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';

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
      <h1 data-testid="page-title">
        {' '}
        {name}
        {' '}
      </h1>
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
