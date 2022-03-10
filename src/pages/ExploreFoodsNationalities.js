import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';

function ExploreFoodsNationalities() {
  return (
    <div>
      <header>
        <div className="header-content">
          <Header name="Explore Nationalities" />
          <button
            type="button"
          >
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="search"
              className="img-icons"
            />
          </button>
        </div>
      </header>
      <Footer />
    </div>
  );
}

export default ExploreFoodsNationalities;
