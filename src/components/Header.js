import React from 'react';
import '../Header.css';
import { useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();

  handleClick = (path) => {
    history.push(path);
  };

  return (
    <header classsName="header-css">
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ handleClick('/profile') }
      >
        <img src="../images/profileIcon.svg" alt="profile icon" />
      </button>
      <h1 data-testid="page-title">Foods</h1>
      <button
        type="button"
        data-testid="search-top-btn"
      >
        <img src="../images/searchIcon.svg" alt="search icon" />
      </button>
    </header>
  );
}

export default Header;
