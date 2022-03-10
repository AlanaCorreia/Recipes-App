import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import MyContext from '../context/myContext';
import searchIcon from '../images/searchIcon.svg';

function Header({ name }) {
  const { searchInput, handleSearch,
    searchBarShow, setSearchBarShow } = useContext(MyContext);

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
      <button
        type="button"
        onClick={ () => setSearchBarShow(!searchBarShow) }
      >
        <img
          src={ searchIcon }
          data-testid="search-top-btn"
          alt="search"
          className="img-icons"
        />
      </button>
      <div>
        { searchBarShow && (
          <input
            name="search-input"
            label="search-input"
            type="text"
            placeholder="Search ..."
            data-testid="search-input"
            onChange={ handleSearch }
            value={ searchInput }
          />
        ) }
      </div>

    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
